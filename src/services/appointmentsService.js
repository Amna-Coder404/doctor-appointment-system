
import { supabase } from "../lib/supabase";

// Get appointments belonging to the logged-in patient.
export const getMyAppointments = async () => {
    const { data: { user }, error: authError, } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!user) throw new Error("Please sign in to view your appointments.");

    const { data, error } = await supabase
        .from("appointments")
        .select(`
        *,
        doctors (
            *
        )
    `)
        .eq("patient_id", user.id)
        .order("starts_at", { ascending: false });

    if (error) throw error;

    return data ?? [];
};

// Cancel an eligible appointment belonging to the logged-in patient.
export const cancelMyAppointment = async (appointmentId) => {
    const { data: { user }, error: authError, } = await supabase.auth.getUser();

    if (authError) throw authError;
    if (!user) throw new Error("Please sign in to cancel an appointment.");

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

    return data;
};

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
