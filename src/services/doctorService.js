import { supabase } from "../lib/supabase";
// FOr LOCAL DB
import {
    getCachedRecords,
    saveCachedRecords,
} from "../database/cacheRepository";

import { getDatabase } from "../database/getDatabase";


const DOCTOR_FIELDS = `
    id,
    full_name,
    specialization,
    qualification,
    experience_years,
    consultation_fee,
    profile_image_url,
    bio,
    phone,
    clinic_name,
    clinic_address
`;

export async function getDoctors() {
    const db = await getDatabase();

    try {
        const { data, error } = await supabase
            .from("doctors")
            .select(DOCTOR_FIELDS)
            .eq("is_active", true)
            .order("full_name", { ascending: true });

        if (error) throw error;

        const doctors = data ?? [];

        await saveCachedRecords(
            db,
            "public",
            "doctor",
            doctors
        );

        return doctors;
    } catch (error) {
        console.log("DOCTORS CACHE ERROR:", error);

        try {
            const cachedDoctors = await getCachedRecords(
                db,
                "public",
                "doctor"
            );

            console.log("CACHED DOCTORS:", cachedDoctors.length);

            if (cachedDoctors.length > 0) {
                return cachedDoctors;
            }
        } catch (cacheError) {
            console.log("SQLITE ERROR:", cacheError);
        }

        throw error;
    }
}


// Iska faida: Kisi particular doctor ki details pehle save hui hon to API fail hone par local copy mil sakti hai.

export async function getDoctorById(doctorId) {
    const db = await getDatabase();

    try {
        const { data, error } = await supabase
            .from("doctors")
            .select(DOCTOR_FIELDS)
            .eq("id", doctorId)
            .eq("is_active", true)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            await saveCachedRecords(
                db,
                "public",
                "doctor",
                [data]
            );
        }

        return data;
    } catch (error) {
        const cachedDoctors = await getCachedRecords(
            db,
            "public",
            "doctor"
        );

        const cachedDoctor = cachedDoctors.find(
            (doctor) => String(doctor.id) === String(doctorId)
        );

        if (cachedDoctor) {
            return cachedDoctor;
        }

        throw error;
    }
}


// GEt Doctor avilbilty 
export async function getDoctorAvailability(doctorId) {
    const { data, error } = await supabase
        .from("doctor_availability")
        .select(
            "id, doctor_id, day_of_week, start_time, end_time, slot_duration_minutes"
        )
        .eq("doctor_id", doctorId)
        .eq("is_active", true)
        .order("start_time");

    if (error) throw error;

    return data ?? [];
}