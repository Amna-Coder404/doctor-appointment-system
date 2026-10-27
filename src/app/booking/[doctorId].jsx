
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import colors from "../../lib/colors";
import { supabase } from "../../lib/supabase";
import {
    getBookedAppointments,
} from "../../services/appointmentsService";
import { getDoctorAvailability } from "../../services/doctorService";
import { generateTimeSlots, getDateKey } from "../../utils/utils";

const PURPLE = colors.primary || "#5935FF";


function formatDateLabel(date) {
    return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        number: date.getDate(),
    };
}

export default function BookingScreen() {
    const router = useRouter();
    const { doctorId, doctor: doctorParam } = useLocalSearchParams();
    const [needsLogin, setNeedsLogin] = useState(false);
    const doctor = useMemo(() => {
        try {
            return typeof doctorParam === "string"
                ? JSON.parse(doctorParam)
                : null;
        } catch {
            return null;
        }
    }, [doctorParam]);

    const id = Array.isArray(doctorId) ? doctorId[0] : doctorId;

    const [selectedDate, setSelectedDate] = useState(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    });
    const [selectedTime, setSelectedTime] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [booked, setBooked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const dates = useMemo(
        () =>
            Array.from({ length: 14 }, (_, index) => {
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() + index);
                return date;
            }),
        []
    );

    const loadAvailability = useCallback(async () => {
        if (!id) {
            setError("Doctor ID is missing. Please open the doctor again.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSelectedTime(null);

            const [scheduleData, bookedData] = await Promise.all([
                getDoctorAvailability(id),
                getBookedAppointments(id, selectedDate),
            ]);

            setSchedules(scheduleData);
            setBooked(bookedData);
        } catch (err) {
            setError(err?.message || "Unable to load available times.");
        } finally {
            setLoading(false);
        }
    }, [id, selectedDate]);

    useEffect(() => {
        loadAvailability();
    }, [loadAvailability]);

    const dayOfWeek = selectedDate.getDay();

    const slots = useMemo(() => {
        const daySchedules = schedules.filter(
            (schedule) => schedule.day_of_week === dayOfWeek
        );

        const allSlots = daySchedules.flatMap((schedule) =>
            generateTimeSlots(schedule, selectedDate).map((slot) => ({
                ...slot,
                duration: schedule.slot_duration_minutes,
            }))
        );

        return allSlots.filter((slot) => {
            const overlaps = booked.some((appointment) => {
                const existingStart = new Date(appointment.starts_at).getTime();
                const existingEnd = new Date(appointment.ends_at).getTime();

                return (
                    slot.startsAt.getTime() < existingEnd &&
                    slot.endsAt.getTime() > existingStart
                );
            });

            return !overlaps;
        });
    }, [schedules, booked, dayOfWeek, selectedDate]);

    async function handleConfirm() {
        if (!doctor || !id || !selectedTime) {
            Alert.alert("Select a time", "Please select an available appointment time.");
            return;
        }

        try {
            setSubmitting(true);
            const { data: { user }, error: userError, } = await supabase.auth.getUser();

            if (userError || !user) {
                setNeedsLogin(true);
                return;
            }

            // Recheck the slot immediately before inserting.
            const latestBooked = await getBookedAppointments(id, selectedDate);
            const startMs = selectedTime.startsAt.getTime();
            const endMs = selectedTime.endsAt.getTime();

            const isTaken = latestBooked.some((appointment) => {
                const existingStart = new Date(appointment.starts_at).getTime();
                const existingEnd = new Date(appointment.ends_at).getTime();
                return startMs < existingEnd && endMs > existingStart;
            });

            if (isTaken) {
                setSelectedTime(null);
                await loadAvailability();
                Alert.alert(
                    "Time no longer available",
                    "Someone has booked this slot. Please choose another time."
                );
                return;
            }

            const { data, error: insertError } = await supabase
                .from("appointments")
                .insert({
                    patient_id: user.id,
                    doctor_id: id,
                    starts_at: selectedTime.startsAt.toISOString(),
                    ends_at: selectedTime.endsAt.toISOString(),
                    consultation_fee: Number(doctor.consultation_fee) || 0,
                    status: "pending",
                    payment_status: "unpaid",
                })
                .select("id")
                .single();

            if (insertError) throw insertError;

            router.replace({
                pathname: "/booking-confirmation",
                params: { appointmentId: data.id },
            });
        } catch (err) {
            if (err?.code === "23P01") {
                Alert.alert(
                    "Time no longer available",
                    "This appointment overlaps with another booking. Please select a different time."
                );
            } else {
                Alert.alert(
                    "Booking failed",
                    err?.message || "Could not create your appointment."
                );
            }
        } finally {
            setSubmitting(false);
        }
    }

    const fee = Number(doctor?.consultation_fee);

    return (
        <View style={styles.screen}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.topBar}>
                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                        accessibilityLabel="Go back"
                    >
                        <Text style={styles.backText}>‹</Text>
                    </Pressable>
                    <Text style={styles.pageTitle}>Book Appointment</Text>
                    <View style={styles.backButton} />
                </View>

                <View style={styles.doctorCard}>
                    {doctor?.profile_image_url ? (
                        <Image
                            source={{ uri: doctor.profile_image_url }}
                            style={styles.doctorImage}
                        />
                    ) : (
                        <View style={[styles.doctorImage, styles.avatarFallback]}>
                            <Text style={styles.avatarText}>
                                {(doctor?.full_name || "D").charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}

                    <View style={styles.doctorInfo}>
                        <Text style={styles.doctorName}>
                            {doctor?.full_name || "Selected doctor"}
                        </Text>
                        {!!doctor?.specialization && (
                            <Text style={styles.specialization}>
                                {doctor.specialization}
                            </Text>
                        )}
                        {!!doctor?.clinic_name && (
                            <Text style={styles.clinic} numberOfLines={2}>
                                {doctor.clinic_name}
                            </Text>
                        )}
                        <Text style={styles.fee}>
                            Consultation fee:{" "}
                            {Number.isFinite(fee) ? fee.toLocaleString() : "—"}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Appointment date</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.dateList}
                >
                    {dates.map((date) => {
                        const active = getDateKey(date) === getDateKey(selectedDate);
                        const label = formatDateLabel(date);

                        return (
                            <Pressable
                                key={getDateKey(date)}
                                onPress={() => {
                                    setSelectedDate(date);
                                    setSelectedTime(null);
                                }}
                                style={[styles.dateItem, active && styles.dateItemActive]}
                            >
                                <Text
                                    style={[styles.dateDay, active && styles.activeText]}
                                >
                                    {label.day}
                                </Text>
                                <Text
                                    style={[styles.dateNumber, active && styles.activeText]}
                                >
                                    {label.number}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                <Text style={styles.sectionTitle}>Available time</Text>

                {loading ? (
                    <View style={styles.stateContainer}>
                        <ActivityIndicator size="small" color={PURPLE} />
                        <Text style={styles.stateText}>Loading available times...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.stateContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                        <Pressable onPress={loadAvailability} style={styles.retryButton}>
                            <Text style={styles.retryText}>Try again</Text>
                        </Pressable>
                    </View>
                ) : slots.length === 0 ? (
                    <View style={styles.stateContainer}>
                        <Text style={styles.stateText}>
                            No available times for this date. Please select another day.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.timeList}>
                        {slots.map((slot) => {
                            const active = selectedTime?.time === slot.time;

                            return (
                                <Pressable
                                    key={`${slot.time}-${slot.duration}`}
                                    onPress={() => setSelectedTime(slot)}
                                    style={[
                                        styles.timeButton,
                                        active && styles.timeButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.timeText,
                                            active && styles.activeText,
                                        ]}
                                    >
                                        {slot.label}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                )}

                <Pressable
                    onPress={handleConfirm}
                    disabled={loading || submitting || !selectedTime || !!error}
                    style={[
                        styles.confirmButton,
                        (loading || submitting || !selectedTime || !!error) &&
                        styles.confirmDisabled,
                    ]}
                >
                    {submitting ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.confirmText}>Confirm Appointment</Text>
                    )}
                </Pressable>
            </ScrollView>

            {needsLogin && (
                <View style={styles.loginCard}>
                    <Text style={styles.loginIcon}>🔐</Text>

                    <Text style={styles.loginTitle}>
                        Sign in to book your appointment
                    </Text>

                    <Text style={styles.loginDescription}>
                        Sign in with Google to confirm your appointment
                        and manage your bookings.
                    </Text>

                    <Pressable
                        style={styles.loginButton}
                        onPress={() => router.push("/auth/login")}
                    >
                        <Text style={styles.loginButtonText}>
                            Continue to Login
                        </Text>
                    </Pressable>
                </View>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 32,
    },
    topBar: {
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    backButton: {
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
    },
    backText: {
        color: "#222222",
        fontSize: 34,
        lineHeight: 38,
    },
    pageTitle: {
        color: "#171717",
        fontSize: 18,
        fontWeight: "700",
    },
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1EEFF",
        borderRadius: 22,
        padding: 14,
        marginBottom: 30,
        gap: 14,
    },
    doctorImage: {
        width: 88,
        height: 100,
        borderRadius: 16,
        backgroundColor: "#E4DEFF",
    },
    avatarFallback: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatarText: {
        color: PURPLE,
        fontSize: 36,
        fontWeight: "800",
    },
    doctorInfo: {
        flex: 1,
        gap: 5,
    },
    doctorName: {
        fontSize: 18,
        color: "#171717",
        fontWeight: "800",
    },
    specialization: {
        color: "#4B4B4B",
        fontSize: 13,
        fontWeight: "600",
    },
    clinic: {
        color: "#747474",
        fontSize: 12,
    },
    fee: {
        color: PURPLE,
        fontWeight: "700",
        fontSize: 13,
        marginTop: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#202020",
        marginBottom: 14,
    },
    dateList: {
        gap: 10,
        paddingVertical: 5,
        paddingHorizontal: 2,
        marginBottom: 26,
    },
    dateItem: {
        width: 58,
        height: 76,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#EEEEF2",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#FFFFFF",
    },
    dateItemActive: {
        backgroundColor: "#31CBE0",
        borderColor: "#31CBE0",
        elevation: 3,
    },
    dateDay: {
        color: "#454545",
        fontSize: 13,
        fontWeight: "600",
    },
    dateNumber: {
        color: "#202020",
        fontSize: 15,
        fontWeight: "800",
    },
    activeText: {
        color: "#FFFFFF",
    },
    timeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 28,
    },
    timeButton: {
        paddingVertical: 11,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderColor: "#E5E5EA",
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
    },
    timeButtonActive: {
        backgroundColor: "#FFA66B",
        borderColor: "#FFA66B",
    },
    timeText: {
        color: "#777777",
        fontSize: 13,
        fontWeight: "600",
    },
    stateContainer: {
        minHeight: 90,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginBottom: 20,
        gap: 10,
    },
    stateText: {
        color: "#777777",
        fontSize: 13,
        textAlign: "center",
    },
    errorText: {
        color: "#DC2626",
        textAlign: "center",
    },
    retryButton: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: "#F1EEFF",
    },
    retryText: {
        color: PURPLE,
        fontWeight: "700",
    },
    confirmButton: {
        minHeight: 52,
        borderRadius: 28,
        backgroundColor: PURPLE,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    confirmDisabled: {
        opacity: 0.5,
    },
    confirmText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },
    // AD als
    loginCard: {
        backgroundColor: "#F1EEFF",
        borderRadius: 20,
        padding: 22,
        alignItems: "center",
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E1D9FF",
    },
    loginIcon: {
        fontSize: 30,
        marginBottom: 10,
    },
    loginTitle: {
        color: "#171717",
        fontSize: 17,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 8,
    },
    loginDescription: {
        color: "#666666",
        fontSize: 13,
        lineHeight: 20,
        textAlign: "center",
        marginBottom: 18,
    },
    loginButton: {
        backgroundColor: "#5935FF",
        borderRadius: 14,
        paddingVertical: 13,
        paddingHorizontal: 24,
        alignItems: "center",
        width: "100%",
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});
