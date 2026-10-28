
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import {
    getPatientProfile,
    updatePatientProfile,
} from "../services/profileService";

export const usePatientProfile = () => {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load the current user's profile
    const loadCurrentUserProfile = useCallback(async () => {
        if (!user?.id) {
            setProfile(null);
            setFullName("");
            setPhone("");
            setCity("");
            setImage(null);
            setLoading(false);
            return null;
        }

        try {
            setLoading(true);
            setError("");

            const data = await getPatientProfile(user.id);

            setProfile(data);
            setFullName(data.full_name ?? "");
            setPhone(data.phone ?? "");
            setCity(data.city ?? "");

            return data;
        } catch (err) {
            console.error("Load profile error:", err.message);
            setError(err.message || "Unable to load your profile.");
            return null;
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadCurrentUserProfile();
    }, [loadCurrentUserProfile]);

    // Select a profile photo
    const pickImage = async () => {
        setError("");

        try {
            const permission =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                setError("Please allow photo library access to select a photo.");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: true,
            });
            if (!result.canceled) {
                setImage(result.assets[0]);
            }
        } catch (err) {
            setError(err.message || "Unable to select an image.");
        }
    };

    // Accept digits only, up to 11 digits
    const changePhone = (value) => {
        setPhone(value.replace(/\D/g, "").slice(0, 11));
    };

    // Save profile changes
    const saveProfile = async () => {
        if (!user?.id) {
            setError("Please sign in to update your profile.");
            return false;
        }

        if (!fullName.trim()) {
            setError("Please enter your full name.");
            return false;
        }

        if (!/^03\d{9}$/.test(phone)) {
            setError("Enter a valid 11-digit phone number starting with 03.");
            return false;
        }

        if (!city.trim()) {
            setError("Please enter your city.");
            return false;
        }

        try {
            setSaving(true);
            setError("");

            const updated = await updatePatientProfile({
                userId: user.id,
                fullName: fullName.trim(),
                phone,
                city: city.trim(),
                image,
            });

            setProfile(updated);
            setFullName(updated.full_name ?? "");
            setPhone(updated.phone ?? "");
            setCity(updated.city ?? "");
            setImage(null);

            return true;
        } catch (err) {
            console.error("Save profile error:", err.message);
            setError(err.message || "Unable to save your profile.");
            return false;
        } finally {
            setSaving(false);
        }
    };

    return {
        profile,
        fullName,
        setFullName,
        phone,
        changePhone,
        city,
        setCity,
        image,
        pickImage,
        loading,
        saving,
        error,
        saveProfile,

        // Both names call the same reusable function
        loadCurrentUserProfile,
        reloadProfile: loadCurrentUserProfile,
    };
};
