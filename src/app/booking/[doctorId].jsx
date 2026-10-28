import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";

import BookingSuccessModal from "../../components/BookingSuccessModal";
import LoginPromptModal from "../../components/LoginPromptModal";
import useBooking from "../../hooks/useBooking";
import colors from "../../lib/colors";
import styles from "../../styles/bookingScreen.style";
import { getDateKey } from "../../utils/utils";

function formatDateLabel(date) {
    return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        number: date.getDate(),
    };
}

export default function BookingScreen() {
    const router = useRouter();
    const { doctorId, doctor: doctorParam } = useLocalSearchParams();

    const id = Array.isArray(doctorId) ? doctorId[0] : doctorId;

    const doctor = useMemo(() => {
        try {
            return typeof doctorParam === "string"
                ? JSON.parse(doctorParam)
                : null;
        } catch {
            return null;
        }
    }, [doctorParam]);

    const {
        dates,
        slots,
        selectedDate,
        selectedTime,
        loading,
        submitting,
        error,
        needsLogin,
        showSuccess,
        disabled,
        selectDate,
        setSelectedTime,
        setShowSuccess,
        loadAvailability,
        confirmBooking,
        closeLogin
    } = useBooking({ id, doctor });

    return (
        <View style={styles.screen}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Hero image */}
                <View style={styles.hero}>
                    {doctor?.profile_image_url ? (
                        <Image
                            source={{ uri: doctor.profile_image_url }}
                            style={styles.heroImage}
                        />
                    ) : (
                        <View style={[styles.heroImage, styles.heroFallback]}>
                            <Text style={styles.heroInitial}>
                                {(doctor?.full_name || "D").charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}

                    <Pressable
                        onPress={() => router.back()}
                        style={styles.backButton}
                        hitSlop={10}
                        accessibilityLabel="Go back"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={26}
                            color={colors.text}
                        />
                    </Pressable>
                </View>

                {/* White sheet */}
                <View style={styles.sheet}>
                    <View style={styles.doctorCard}>
                        <Text style={styles.doctorName}>
                            {doctor?.full_name || "Selected doctor"}
                        </Text>
                        {!!doctor?.specialization && (
                            <Text style={styles.doctorLine}>
                                {doctor.specialization}
                            </Text>
                        )}
                        {!!doctor?.clinic_name && (
                            <Text style={styles.doctorLine}>
                                {doctor.clinic_name}
                            </Text>
                        )}
                    </View>

                    <Text style={styles.sectionTitle}>Appointment</Text>

                    <View style={styles.dateWrap}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.dateList}
                        >
                            {dates.map((date) => {
                                const active =
                                    getDateKey(date) === getDateKey(selectedDate);
                                const label = formatDateLabel(date);

                                return (
                                    <Pressable
                                        key={getDateKey(date)}
                                        onPress={() => selectDate(date)}
                                        style={[
                                            styles.dateItem,
                                            active && styles.dateItemActive,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dateDay,
                                                active && styles.activeText,
                                            ]}
                                        >
                                            {label.day}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.dateNumber,
                                                active && styles.activeText,
                                            ]}
                                        >
                                            {label.number}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <Text style={styles.sectionTitle}>Available Time</Text>

                    {loading ? (
                        <View style={styles.stateContainer}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                            <Text style={styles.stateText}>
                                Loading available times...
                            </Text>
                        </View>
                    ) : error ? (
                        <View style={styles.stateContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                            <Pressable
                                onPress={loadAvailability}
                                style={styles.retryButton}
                            >
                                <Text style={styles.retryText}>Try again</Text>
                            </Pressable>
                        </View>
                    ) : slots.length === 0 ? (
                        <View style={styles.stateContainer}>
                            <Text style={styles.stateText}>
                                No available times for this date. Please select
                                another day.
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
                                                active && styles.timeTextActive,
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
                        onPress={confirmBooking}
                        disabled={disabled || showSuccess}
                        style={[
                            styles.confirmButton,
                            (disabled || showSuccess) && styles.confirmDisabled,
                        ]}
                    >
                        {submitting ? (
                            <ActivityIndicator color={colors.textOnPrimary} />
                        ) : (
                            <Text style={styles.confirmText}>Confirm</Text>
                        )}
                    </Pressable>


                </View>
            </ScrollView>
            <LoginPromptModal
                visible={needsLogin}
                onClose={closeLogin}
                onLogin={() => {
                    closeLogin();
                    router.push("/auth/login");
                }}
            />
            <BookingSuccessModal
                visible={showSuccess}
                onViewAppointments={() => {
                    setShowSuccess(false);
                    router.replace("/(tabs)/appointments");
                }}
                onGoHome={() => {
                    setShowSuccess(false);
                    router.replace("/(tabs)");
                }}
            />
        </View>
    );
}