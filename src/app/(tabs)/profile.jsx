import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import Loader from "../../components/Loader";
import ProfileModal from "../../components/ProfileModal";
import useAuth from "../../hooks/useAuth";
import { usePatientProfile } from "../../hooks/usePatientProfile";
import colors from "../../lib/colors";
import styles from "../../styles/profileScreen.style";
import { getImageSource } from "../../utils/utils";

// Reusable fade + slide-up wrapper with stagger delay
function FadeUp({ delay = 0, style, children }) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 350, delay }}
            style={style}
        >
            {children}
        </MotiView>
    );
}

export default function ProfileScreen() {
    const router = useRouter();
    const { user, loading: authLoading, signOut } = useAuth();
    const { loadCurrentUserProfile, profile } = usePatientProfile();

    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);

    const avatarSource = getImageSource(
        profile?.avatar_url,
        profile?.updated_at
    );

    useEffect(() => {
        setAvatarFailed(false);
    }, [profile?.avatar_url]);

    useEffect(() => {
        if (user?.id) {
            loadCurrentUserProfile();
        }
    }, [user?.id, loadCurrentUserProfile]);
    if (authLoading) return <Loader />;

    return (
        <View style={styles.container}>
            {/* Banner */}
            <View style={styles.banner}>
                <Text style={styles.bannerTitle}>Profile</Text>
                <Text style={styles.bannerSubtitle}>
                    Manage your personal information.
                </Text>
            </View>

            {!user ? (
                <MotiView
                    from={{ opacity: 0, translateY: 24, scale: 0.97 }}
                    animate={{ opacity: 1, translateY: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 16, stiffness: 140 }}
                    style={[styles.profileCard, styles.guestCard]}
                >
                    <Text style={styles.name}>Welcome</Text>
                    <Text style={styles.email}>
                        Sign in to view and manage your profile.
                    </Text>

                    <Pressable
                        style={styles.signInButton}
                        onPress={() => router.push("/auth/login")}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                </MotiView>
            ) : (
                <MotiView
                    from={{ opacity: 0, translateY: 24, scale: 0.97 }}
                    animate={{ opacity: 1, translateY: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 16, stiffness: 140 }}
                    style={styles.profileCard}
                >
                    {/* Avatar (overlaps banner) */}
                    <MotiView
                        from={{ scale: 0, rotate: "-20deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        transition={{
                            type: "spring",
                            damping: 11,
                            stiffness: 150,
                            delay: 150,
                        }}
                        style={styles.avatar}
                    >
                        {avatarSource && !avatarFailed ? (
                            <Image
                                source={avatarSource}
                                style={styles.avatarImage}
                                onError={() => setAvatarFailed(true)}
                            />
                        ) : (
                            <Ionicons
                                name="person"
                                size={44}
                                color={colors.primary}
                            />
                        )}
                    </MotiView>

                    <FadeUp delay={250}>
                        <Text style={styles.name}>
                            {profile?.full_name || "Add your full name"}
                        </Text>
                    </FadeUp>

                    <FadeUp delay={320}>
                        <Text style={styles.email}>
                            {profile?.email || user.email}
                        </Text>
                    </FadeUp>

                    <FadeUp delay={400} style={{ width: "100%" }}>
                        <View style={styles.infoCard}>
                            <View style={styles.infoIcon}>
                                <Ionicons
                                    name="call-outline"
                                    size={20}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>
                                    {profile?.phone || "Add phone number"}
                                </Text>
                            </View>
                        </View>
                    </FadeUp>

                    <FadeUp delay={480} style={{ width: "100%" }}>
                        <View style={styles.infoCard}>
                            <View style={styles.infoIcon}>
                                <Ionicons
                                    name="location-outline"
                                    size={20}
                                    color={colors.primary}
                                />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>City</Text>
                                <Text style={styles.infoValue}>
                                    {profile?.city || "Add city"}
                                </Text>
                            </View>
                        </View>
                    </FadeUp>

                    <FadeUp delay={560} style={{ width: "100%" }}>
                        <View style={styles.actions}>
                            <Pressable
                                onPress={() => setProfileModalVisible(true)}
                                style={styles.button}
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={17}
                                    color={colors.textOnPrimary}
                                />
                                <Text style={styles.buttonText}>Edit Profile</Text>
                            </Pressable>

                            <Pressable
                                onPress={async () => {
                                    try {
                                        await signOut();
                                    } catch (err) {
                                        console.error(
                                            "Sign out error:",
                                            err.message
                                        );
                                    }
                                }}
                                style={styles.signOutButton}
                            >
                                <Ionicons
                                    name="log-out-outline"
                                    size={17}
                                    color={colors.danger}
                                />
                                <Text style={styles.signOutText}>Sign Out</Text>
                            </Pressable>
                        </View>
                    </FadeUp>

                    <ProfileModal
                        visible={profileModalVisible}
                        onClose={() => setProfileModalVisible(false)}
                        onSaved={async () => {
                            await loadCurrentUserProfile();
                            setProfileModalVisible(false);
                        }}
                    />
                </MotiView>
            )}
        </View>
    );
}