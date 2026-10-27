
import { supabase } from "../lib/supabase";


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
