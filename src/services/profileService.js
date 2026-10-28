import { decode } from "base64-arraybuffer";
import { supabase } from "../lib/supabase";

const AVATAR_BUCKET = "patient-avatars";

export const getPatientProfile = async (userId) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;

    return data;
};

// Upload avatar and return its public URL
const uploadAvatar = async (userId, image) => {
    const mimeType = image.mimeType || "image/jpeg";
    const ext = (mimeType.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const filePath = `${userId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(filePath, decode(image.base64), {
            contentType: mimeType,
            upsert: true,
        });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from(AVATAR_BUCKET)
        .getPublicUrl(filePath);

    return data.publicUrl;
};

// Update user profile
export const updatePatientProfile = async ({
    userId,
    fullName,
    phone,
    city,
    image,
}) => {
    const updates = {
        full_name: fullName.trim(),
        phone,
        city: city.trim(),
        updated_at: new Date().toISOString(),
    };

    if (image?.base64) {
        updates.avatar_url = await uploadAvatar(userId, image);
    }

    const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select("*")
        .single();

    if (error) throw error;

    return data;
};