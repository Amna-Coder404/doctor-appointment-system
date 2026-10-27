import { supabase } from "../lib/supabase";

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
    const { data, error } = await supabase
        .from("doctors")
        .select(DOCTOR_FIELDS)
        .eq("is_active", true)
        .order("full_name", { ascending: true });

    if (error) {
        throw error;
    }

    return data ?? [];
}

export async function getDoctorById(doctorId) {
    const { data, error } = await supabase
        .from("doctors")
        .select(DOCTOR_FIELDS)
        .eq("id", doctorId)
        .eq("is_active", true)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data;
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
