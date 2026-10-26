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