import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from "react-native";

import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import colors from "../../lib/colors";
import { getDoctorById } from "../../services/doctorService";
import styles from "../../styles/doctorDetail.style";

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
                    <Text style={styles.sectionTitle}>About Me</Text>
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

