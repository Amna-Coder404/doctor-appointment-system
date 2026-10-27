
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
    ActivityIndicator,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { usePatientProfile } from "../hooks/usePatientProfile";
import colors from "../lib/colors";
import styles from "../styles/profileModal.style";

export default function ProfileModal({ visible, onClose, onSaved }) {
    const {
        profile,
        fullName,
        setFullName,
        phone,
        changePhone,
        image,
        pickImage,
        loading,
        saving,
        error,
        saveProfile,
        reloadProfile,
        city,
        setCity,
    } = usePatientProfile();

    useEffect(() => {
        if (visible) reloadProfile();
    }, [visible, reloadProfile]);

    const handleSave = async () => {
        const success = await saveProfile();

        if (success) {
            await onSaved?.();
            onClose();
        }
    };

    const photoUri = image?.uri || profile?.avatar_url;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.title}>Edit profile</Text>
                            <Text style={styles.subtitle}>
                                Update your personal details
                            </Text>
                        </View>

                        <Pressable
                            onPress={onClose}
                            style={styles.closeButton}
                            accessibilityLabel="Close profile editor"
                        >
                            <Ionicons
                                name="close"
                                size={23}
                                color={colors.text}
                            />
                        </Pressable>
                    </View>

                    {loading ? (
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                            style={styles.loader}
                        />
                    ) : (
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <Pressable
                                style={styles.photoContainer}
                                onPress={pickImage}
                            >
                                {photoUri ? (
                                    <Image
                                        source={{ uri: photoUri }}
                                        style={styles.avatar}
                                    />
                                ) : (
                                    <View style={styles.avatarPlaceholder}>
                                        <Ionicons
                                            name="person"
                                            size={38}
                                            color={colors.primary}
                                        />
                                    </View>
                                )}

                                <View style={styles.cameraIcon}>
                                    <Ionicons
                                        name="camera"
                                        size={17}
                                        color="#FFFFFF"
                                    />
                                </View>

                                <Text style={styles.changePhoto}>
                                    Change profile photo
                                </Text>
                            </Pressable>

                            <Text style={styles.label}>Full name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor={colors.textMuted}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                                maxLength={100}
                            />

                            <Text style={styles.label}>Email address</Text>
                            <TextInput
                                style={[styles.input, styles.readOnlyInput]}
                                value={profile?.email || ""}
                                editable={false}
                            />

                            <Text style={styles.label}>Phone number</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="03XXXXXXXXX"
                                placeholderTextColor={colors.textMuted}
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={changePhone}
                                maxLength={11}
                            />


                            <Text style={styles.label}>City</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your city"
                                placeholderTextColor={colors.textMuted}
                                value={city}
                                onChangeText={setCity}
                                autoCapitalize="words"
                                maxLength={100}
                            />
                            {!!error && (
                                <Text style={styles.error}>{error}</Text>
                            )}

                            <Pressable
                                style={[
                                    styles.saveButton,
                                    saving && styles.disabledButton,
                                ]}
                                onPress={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={styles.saveButtonText}>
                                        Save changes
                                    </Text>
                                )}
                            </Pressable>
                        </ScrollView>
                    )}
                </View>
            </View>
        </Modal>
    );
}
