// src/services/profileService.js

import NetInfo from "@react-native-community/netinfo";
import { decode } from "base64-arraybuffer";

import {
    getCachedRecords
} from "../database/cacheRepository";
import { initializeDatabase } from "../database/database";
import { getDatabase } from "../database/getDatabase";

import { supabase } from "../lib/supabase";

const AVATAR_BUCKET = "patient-avatars";
const PROFILE_RECORD_TYPE = "profile";

const getProfileScope = (userId) =>
    `patient-profile:${userId}`;

// Get initialized SQLite database.
const getReadyDatabase = async () => {
    const db = await getDatabase();
    await initializeDatabase(db);
    return db;
};

// Read profile from local SQLite cache.
export const getCachedPatientProfile = async (userId) => {
    if (!userId) return null;

    const db = await getReadyDatabase();

    const profiles = await getCachedRecords(
        db,
        getProfileScope(userId),
        PROFILE_RECORD_TYPE
    );

    return profiles.find((item) => item.id === userId) ?? null;
};

// Save the latest profile in SQLite.
export const cachePatientProfile = async (profile) => {
    if (!profile?.id) return;

    const db = await getReadyDatabase();
    const scope = getProfileScope(profile.id);

    // Keep the cache update atomic to avoid transaction conflicts.
    await db.withExclusiveTransactionAsync(async (transaction) => {
        await transaction.runAsync(
            `INSERT OR REPLACE INTO local_cache
            (cache_scope, record_type, record_id, data_json, cached_at)
            VALUES (?, ?, ?, ?, ?)`,
            scope,
            PROFILE_RECORD_TYPE,
            String(profile.id),
            JSON.stringify(profile),
            new Date().toISOString()
        );
    });
};

// Fetch profile online, falling back to SQLite when offline.
export const getPatientProfile = async (userId) => {
    if (!userId) {
        throw new Error("Patient user ID is required.");
    }

    try {
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) throw error;

        if (data) {
            // If caching fails, do not hide a successful server response.
            try {
                await cachePatientProfile(data);
            } catch (cacheError) {
                console.warn(
                    "Unable to cache patient profile:",
                    cacheError.message
                );
            }

            return data;
        }

        throw new Error("Patient profile was not found.");
    } catch (networkOrServerError) {
        try {
            const cachedProfile =
                await getCachedPatientProfile(userId);

            if (cachedProfile) {
                return cachedProfile;
            }
        } catch (cacheError) {
            console.warn(
                "Unable to read cached patient profile:",
                cacheError.message
            );
        }

        throw networkOrServerError;
    }
};

// Upload avatar and return its public URL.
const uploadAvatar = async (userId, image) => {
    if (!image?.base64) {
        throw new Error("Please select a valid profile image.");
    }

    const mimeType = image.mimeType || "image/jpeg";
    const ext = (mimeType.split("/")[1] || "jpg")
        .replace("jpeg", "jpg");

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

// Update profile online only, then refresh the SQLite cache.
export const updatePatientProfile = async ({
    userId,
    fullName,
    phone,
    city,
    image,
}) => {
    if (!userId) {
        throw new Error("Please sign in to update your profile.");
    }

    const network = await NetInfo.fetch();

    const isOnline =
        network.isConnected === true &&
        network.isInternetReachable !== false;

    if (!isOnline) {
        throw new Error(
            "You cannot update your profile while offline. " +
            "Please connect to the internet and try again."
        );
    }

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

    // Cache failure should not turn a successful server update into failure.
    try {
        await cachePatientProfile(data);
    } catch (cacheError) {
        console.warn(
            "Profile updated, but SQLite cache refresh failed:",
            cacheError.message
        );
    }

    return data;
};