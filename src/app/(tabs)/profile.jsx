
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import Loader from "../../components/Loader";
import ProfileModal from "../../components/ProfileModal";
import useAuth from "../../hooks/useAuth";
import { usePatientProfile } from "../../hooks/usePatientProfile";
import colors from "../../lib/colors";

export default function ProfileScreen() {
    const router = useRouter();
    const { user, loading: authLoading, signOut } = useAuth();
    const { loadCurrentUserProfile, error, profile } = usePatientProfile();


    const [profileModalVisible, setProfileModalVisible] = useState(false);




    if (authLoading) return <Loader />
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Manage your personal information.
            </Text>

            {!user ? (
                <View style={styles.profileCard}>
                    <Text style={styles.name}>Welcome</Text>
                    <Text style={styles.email}>
                        Sign in to view and manage your profile.
                    </Text>

                    <Pressable
                        style={styles.button}
                        onPress={() => router.push("/auth/login")}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                </View>
            ) : (
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {(profile?.full_name || user.email || "U")
                                .charAt(0)
                                .toUpperCase()}
                        </Text>
                    </View>

                    <Text style={styles.name}>
                        {profile?.full_name || "Add your full name"}
                    </Text>

                    <Text style={styles.email}>
                        {profile?.email || user.email}
                    </Text>

                    <View style={styles.infoCard}>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>Phone</Text>
                            <Text style={styles.infoValue}>
                                {profile?.phone || "Add phone number"}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoContent}>
                            <Text style={styles.infoLabel}>City</Text>
                            <Text style={styles.infoValue}>
                                {profile?.city || "Add city"}
                            </Text>
                        </View>
                    </View>

                    <Pressable onPress={() => setProfileModalVisible(true)} style={styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </Pressable>
                    <Pressable
                        onPress={async () => {
                            try {
                                await signOut();
                            } catch (err) {
                                console.error("Sign out error:", err.message);
                            }
                        }}
                        style={{
                            backgroundColor: colors.surface,
                            borderWidth: 1,
                            borderColor: colors.border,
                            padding: 15,
                            borderRadius: 14,
                            alignItems: "center",
                            marginTop: 12,
                            width: "100%",
                        }}
                    >
                        <Text style={{ color: colors.text, fontWeight: "700" }}>
                            Sign Out
                        </Text>
                    </Pressable>
                    <ProfileModal
                        visible={profileModalVisible}
                        onClose={() => setProfileModalVisible(false)}
                        onSaved={async () => {
                            await loadCurrentUserProfile();
                            setProfileModalVisible(false);
                        }}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
        padding: 20,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 6,
    },
    profileCard: {
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 24,
        marginTop: 28,
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: colors.doctorPlaceholder,
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.text,
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
        marginTop: 14,
    },
    email: {
        color: colors.textSecondary,
        fontSize: 13,
        marginTop: 5,
        textAlign: "center",
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 16,
        borderRadius: 16,
        marginTop: 14,
        width: "100%",
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
    },
    infoValue: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 5,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 20,
        width: "100%",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    error: {
        color: "#DC2626",
        marginTop: 12,
        textAlign: "center",
    },
});
