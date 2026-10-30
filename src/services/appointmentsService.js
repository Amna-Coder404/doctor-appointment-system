import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import {
    clearCachedRecords,
    getCachedRecords,
    saveCachedRecords,
} from "../database/cacheRepository";
import { initializeDatabase } from "../database/database";
import { getDatabase } from "../database/getDatabase";
import { supabase } from "../lib/supabase";
import { getDateKey } from "../utils/utils";

const LAST_PATIENT_ID_KEY = "last_appointments_patient_id";

const getAppointmentCache = async (patientId) => {
    const db = await getDatabase();
    await initializeDatabase(db);

    return getCachedRecords(
        db,
        `appointments:${patientId}`,
        "appointment"
    );
};

const EMPTY_SNAPSHOT_ID = "__empty_snapshot__";

// Get appointments from Supabase or the local SQLite cache.
export const getMyAppointments = async () => {
    const { data: { session }, error: sessionError, } = await supabase.auth.getSession();

    if (sessionError) throw sessionError;

    const patientId =
        session?.user?.id ||
        await AsyncStorage.getItem(LAST_PATIENT_ID_KEY);

    if (!patientId) {
        throw new Error(
            "No saved appointments found. Please sign in online first."
        );
    }

    const db = await getDatabase();
    await initializeDatabase(db);

    const scope = `appointments:${patientId}`;

    try {
        // Logged out: return only previously cached appointments.
        if (!session?.user?.id) {
            return await getCachedRecords(db, scope, "appointment");
        }

        await AsyncStorage.setItem(
            LAST_PATIENT_ID_KEY,
            session.user.id
        );

        const { data, error } = await supabase
            .from("appointments")
            .select(`
                *,
                doctors (*)
            `)
            .eq("patient_id", session.user.id)
            .order("starts_at", { ascending: false });

        if (error) throw error;

        const appointments = data ?? [];

        // Clear old cached appointments, including stale records.
        await clearCachedRecords(db, scope);

        if (appointments.length > 0) {
            await saveCachedRecords(
                db,
                scope,
                "appointment",
                appointments
            );
        }

        return appointments;
    } catch (error) {
        // Network failure: fall back to previously cached records.
        const cachedAppointments = await getCachedRecords(
            db,
            scope,
            "appointment"
        );

        if (cachedAppointments.length > 0) {
            return cachedAppointments;
        }

        throw error;
    }
};

// Cancel an appointment only when online and authenticated.
export const cancelMyAppointment = async (appointmentId) => {
    const network = await NetInfo.fetch();

    const isOnline =
        network.isConnected === true &&
        network.isInternetReachable !== false;

    if (!isOnline) {
        throw new Error(
            "You cannot cancel an appointment while offline. Please turn on Wi-Fi or mobile data and try again."
        );
    }

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) {
        throw new Error(
            "Please sign in to cancel an appointment."
        );
    }

    const { data, error } = await supabase
        .from("appointments")
        .update({ status: "cancelled" })
        .eq("id", appointmentId)
        .eq("patient_id", user.id)
        .in("status", ["pending", "confirmed"])
        .select("id, status")
        .maybeSingle();

    if (error) throw error;

    if (!data) {
        throw new Error(
            "This appointment cannot be cancelled. It may already be completed, cancelled, or unavailable."
        );
    }

    // Return the confirmed server update.
    return data;
};

// Fetch booked time slots for a doctor on a particular date.
export const getBookedAppointments = async (doctorId, date) => {
    const db = await getDatabase();
    await initializeDatabase(db);

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const dateKey = getDateKey(start);
    const scope = `doctor-bookings:${doctorId}:${dateKey}`;
    const recordType = "booked-appointment";

    const readCachedBookings = async () => {
        const cached = await getCachedRecords(
            db,
            scope,
            recordType
        );

        // An empty snapshot means we previously checked this date
        // online and there were no bookings.
        const hasSnapshot = cached.some(
            (item) => item.id === EMPTY_SNAPSHOT_ID
        );

        if (cached.length === 0) {
            throw new Error(
                "No saved appointment availability for this date. Connect to the internet to load it first."
            );
        }

        if (!hasSnapshot && cached.length === 0) {
            throw new Error("No cached booking information is available.");
        }

        return cached.filter(
            (item) => item.id !== EMPTY_SNAPSHOT_ID
        );
    };

    const network = await NetInfo.fetch();
    const isOnline =
        network.isConnected === true &&
        network.isInternetReachable !== false;

    if (!isOnline) {
        return readCachedBookings();
    }

    try {
        const { data, error } = await supabase
            .from("appointments")
            .select("id, starts_at, ends_at, status")
            .eq("doctor_id", doctorId)
            .in("status", ["pending", "confirmed"])
            .lt("starts_at", end.toISOString())
            .gt("ends_at", start.toISOString());

        if (error) throw error;

        const appointments = data ?? [];

        // Clear old records so cancelled bookings aren't kept in cache.
        await clearCachedRecords(db, scope);

        // Save a marker even when there are no bookings, so offline
        // mode can distinguish "checked and empty" from "never cached".
        const recordsToCache =
            appointments.length > 0
                ? appointments
                : [
                    {
                        id: EMPTY_SNAPSHOT_ID,
                        starts_at: "",
                        ends_at: "",
                        status: "empty_snapshot",
                    },
                ];

        await saveCachedRecords(
            db,
            scope,
            recordType,
            recordsToCache
        );

        return appointments;
    } catch (error) {
        try {
            return await readCachedBookings();
        } catch {
            throw error;
        }
    }
};



// Delete the appointments supabase + Sqlite Db

/**
 * Permanently delete multiple appointments.
 * Supabase deletion happens first; SQLite cache is updated only
 * after the server confirms the deletion.
 */
export const deleteMyAppointments = async (appointmentIds) => {
    const uniqueIds = [
        ...new Set(
            (appointmentIds ?? [])
                .filter((id) => typeof id === "string" && id.length > 0)
        ),
    ];

    if (uniqueIds.length === 0) {
        throw new Error("Please select at least one appointment.");
    }

    const network = await NetInfo.fetch();

    const isOnline =
        network.isConnected === true &&
        network.isInternetReachable !== false;

    if (!isOnline) {
        throw new Error(
            "Connect to the internet before deleting appointments."
        );
    }

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) {
        throw new Error("Please sign in to delete appointments.");
    }

    // Delete only appointments belonging to the authenticated patient.
    const { data: deletedRows, error } = await supabase
        .from("appointments")
        .delete()
        .eq("patient_id", user.id)
        .in("id", uniqueIds)
        .select("id");

    if (error) throw error;

    const deletedIds = (deletedRows ?? []).map((row) => row.id);

    if (deletedIds.length === 0) {
        throw new Error(
            "No appointments were deleted. They may no longer be available."
        );
    }

    // Update the local SQLite cache after server deletion succeeds.
    const db = await getDatabase();
    await initializeDatabase(db);

    const scope = `appointments:${user.id}`;

    const cachedAppointments = await getCachedRecords(
        db,
        scope,
        "appointment"
    );

    const remainingAppointments = cachedAppointments.filter(
        (appointment) => !deletedIds.includes(appointment.id)
    );

    await clearCachedRecords(db, scope);

    if (remainingAppointments.length > 0) {
        await saveCachedRecords(
            db,
            scope,
            "appointment",
            remainingAppointments
        );
    }

    return deletedIds;
};
