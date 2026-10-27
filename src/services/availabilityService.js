
import { supabase } from "../lib/supabase";

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

export const getBookedAppointments = async (doctorId, date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setDate(end.getDate() + 1);
    end.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
        .from("appointments")
        .select("starts_at, ends_at, status")
        .eq("doctor_id", doctorId)
        .in("status", ["pending", "confirmed"])
        .lt("starts_at", end.toISOString())
        .gt("ends_at", start.toISOString());

    if (error) throw error;

    return data ?? [];
}
