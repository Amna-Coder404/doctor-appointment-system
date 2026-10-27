import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import colors from "../../lib/colors";
import { getDoctorById } from "../../services/doctorService";

export default function DoctorDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!id || Array.isArray(id)) return;

        let active = true;

        async function loadDoctor() {
            try {
                setLoading(true);
                setError("");

                const result = await getDoctorById(id);

                if (active) {
                    setDoctor(result);
                    if (!result) setError("Doctor not found.");
                }
            } catch (err) {
                if (active) {
                    setError(err.message || "Unable to load doctor.");
                }
            } finally {
                if (active) setLoading(false);
            }
        }

        loadDoctor();

        return () => {
            active = false;
        };
    }, [id]);

    if (loading) {
        return <Loader />
    }

    if (error || !doctor) {
        return <NotFound text={"Doctor not found."} />
    }

    const bio = doctor.bio || "";
    const shortBio = bio.length > 135 ? `${bio.slice(0, 135).trim()}...` : bio;

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    hitSlop={12}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={26} color={colors.text} />
                </Pressable>

                <Text style={styles.headerTitle}>Doctor</Text>

                <View style={styles.headerSpace} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.hero}>
                    {doctor.profile_image_url ? (
                        <Image
                            source={{ uri: doctor.profile_image_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={[styles.image, styles.placeholder]}>
                            <Ionicons
                                name="person"
                                size={86}
                                color={colors.primary}
                            />
                        </View>
                    )}
                </View>

                <View style={styles.identity}>
                    <Text style={styles.name}>Dr. {doctor.full_name}</Text>
                    <Text style={styles.specialization}>
                        {doctor.specialization}
                    </Text>
                    {!!doctor.qualification && (
                        <Text style={styles.qualification}>
                            {doctor.qualification}
                        </Text>
                    )}
                </View>

                <View style={styles.stats}>
                    <View style={styles.stat}>
                        <View style={styles.statIcon}>
                            <Ionicons
                                name="briefcase"
                                size={23}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.statValue}>
                            {doctor.experience_years ?? 0}+
                        </Text>
                        <Text style={styles.statLabel}>Years</Text>
                    </View>

                    <View style={styles.stat}>
                        <View style={styles.statIcon}>
                            <Ionicons
                                name="wallet"
                                size={23}
                                color={colors.primary}
                            />
                        </View>
                        <Text style={styles.statValue}>
                            Rs. {Number(doctor.consultation_fee ?? 0).toLocaleString()}
                        </Text>
                        <Text style={styles.statLabel}>Consultation fee</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About MW</Text>
                    <Text style={styles.bio}>
                        {bio
                            ? expanded
                                ? bio
                                : shortBio
                            : "No doctor biography has been added yet."}
                    </Text>

                    {bio.length > 135 && (
                        <Pressable onPress={() => setExpanded(!expanded)}>
                            <Text style={styles.readMore}>
                                {expanded ? "Read Less" : "Read More..."}
                            </Text>
                        </Pressable>
                    )}
                </View>

                {(doctor.clinic_name || doctor.clinic_address || doctor.phone) && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Clinic Information</Text>

                        {!!doctor.clinic_name && (
                            <InfoRow
                                icon="business-outline"
                                label="Clinic"
                                value={doctor.clinic_name}
                            />
                        )}

                        {/* {!!doctor.clinic_address && (
                            <InfoRow
                                icon="location-outline"
                                label="Address"
                                value={doctor.clinic_address}
                            />
                        )} */}

                        {!!doctor.phone && (
                            <InfoRow
                                icon="call-outline"
                                label="Phone"
                                value={doctor.phone}
                            />
                        )}
                    </View>
                )}
            </ScrollView>
            {/* GO to Booking PAge */}
            <View style={styles.bottom}>
                <Pressable
                    style={({ pressed }) => [
                        styles.bookButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={() =>
                        router.push({
                            pathname: "/booking/[doctorId]",
                            params: {
                                doctorId: doctor.id,
                                doctor: JSON.stringify(doctor),
                            },
                        })
                    }
                >
                    <Text style={styles.bookButtonText}>
                        Book Appointment
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <View style={styles.infoRow}>
            <Ionicons name={icon} size={21} color={colors.primary} />
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.surface },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.background,
    },
    header: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },
    backButton: { width: 40 },
    headerTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
    headerSpace: { width: 40 },
    content: { paddingBottom: 20 },
    hero: {
        marginHorizontal: 18,
        height: 280,
        overflow: "hidden",
        borderRadius: 28,
        backgroundColor: colors.doctorPlaceholder,
    },
    image: { width: "100%", height: "100%" },
    placeholder: { alignItems: "center", justifyContent: "center" },
    identity: { paddingHorizontal: 22, paddingTop: 16 },
    name: { fontSize: 20, fontWeight: "800", color: colors.text },
    specialization: {
        marginTop: 5,
        fontSize: 14,
        color: colors.primary,
        fontWeight: "600",
    },
    qualification: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 26,
        paddingHorizontal: 16,
    },
    stat: { flex: 1, alignItems: "center", gap: 7 },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.surfaceMint,
        alignItems: "center",
        justifyContent: "center",
    },
    statValue: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },
    statLabel: { fontSize: 12, color: colors.textSecondary },
    section: { paddingHorizontal: 22, marginTop: 25 },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 9,
    },
    bio: { fontSize: 13, lineHeight: 20, color: colors.textSecondary },
    readMore: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
        marginTop: 4,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        paddingVertical: 10,
    },
    infoContent: { flex: 1 },
    infoLabel: { fontSize: 12, color: colors.textSecondary },
    infoValue: {
        fontSize: 14,
        color: colors.text,
        marginTop: 3,
        lineHeight: 20,
    },
    bottom: {
        paddingHorizontal: 22,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: colors.surface,
    },
    bookButton: {
        minHeight: 50,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    buttonPressed: { opacity: 0.82 },
    bookButtonText: {
        color: colors.textOnPrimary,
        fontSize: 15,
        fontWeight: "700",
    },
    error: { color: colors.danger, textAlign: "center", marginBottom: 12 },
    backText: { color: colors.primary, fontWeight: "700" },
});