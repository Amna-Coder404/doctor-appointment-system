import { supabase } from "../lib/supabase";


const AVATAR_BUCKET = "patient-avatars";

export const getPatientProfile = async (userId) => {
    const { data, error } = await supabase.from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
}


// update user profile
export const updatePatientProfile = async ({ userId, fullName, phone, city, image }) => {

    let avatarUrl;

    if (image) {
        const extension = image.fileName?.split(".").pop()?.toLowerCase() || "jpg";
        const filePath = `${userId}/${Date.now()}.${extension}`;

        const response = await fetch(image.uri);
        const blob = await response.blob();


        const { error: uploadError } = await supabase.storage.from(AVATAR_BUCKET).upload(filePath, blob, {
            contentType: image.mimeType || "image/jpeg",
            upsert: false,
        });
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(filePath);

        avatarUrl = data.publicUrl;

    }

    const updates = {
        full_name: fullName.trim(),
        phone,
        city: city.trim(),
        updated_at: new Date().toISOString(),
    };
    if (avatarUrl) {
        updates.avatar_url = avatarUrl;
    }

    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select("id, full_name, email, phone, avatar_url, role")
        .single();

    if (error) throw error;

    return data;
}