import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { Pressable, View } from "react-native";

import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";
import { formatAppointmentDate, formatMoney } from "../../utils/utils";

const STATUS_CONFIG = {
    pending: {
        badge: styles.statusPending,
        text: styles.statusPendingText,
        dot: styles.statusPendingDot,
    },
    confirmed: {
        badge: styles.statusConfirmed,
        text: styles.statusConfirmedText,
        dot: styles.statusConfirmedDot,
    },
    completed: {
        badge: styles.statusCompleted,
        text: styles.statusCompletedText,
        dot: styles.statusCompletedDot,
    },
    cancelled: {
        badge: styles.statusCancelled,
        text: styles.statusCancelledText,
        dot: styles.statusCancelledDot,
    },
    unknown: {
        badge: styles.statusUnknown,
        text: styles.statusUnknownText,
        dot: styles.statusUnknownDot,
    },
};

const PAYMENT_CONFIG = {
    paid: [styles.pillSuccess, styles.pillSuccessText],
    pending: [styles.pillWarning, styles.pillWarningText],
    unpaid: [styles.pillWarning, styles.pillWarningText],
    failed: [styles.pillDanger, styles.pillDangerText],
    refunded: [styles.pillDanger, styles.pillDangerText],
    unknown: [styles.pillNeutral, styles.pillNeutralText],
};

const getDoctor = (appointment) => {
    const relation = appointment.doctors;
    return Array.isArray(relation) ? relation[0] : relation;
};

function ScheduleCell({ icon, label, value }) {
    return (
        <MotiView style={styles.scheduleCell}>
            <MotiView style={styles.scheduleHeader}>
                <MotiView style={styles.scheduleIcon}>
                    <Ionicons
                        name={icon}
                        size={14}
                        color={colors.primary}
                    />
                </MotiView>

                <MotiText style={styles.scheduleLabel}>
                    {label}
                </MotiText>
            </MotiView>

            <MotiText style={styles.scheduleValue}>
                {value}
            </MotiText>
        </MotiView>
    );
}

export default function AppointmentCard({
    appointment,
    onCancel,
    index = 0,
    selectionMode = false,
    selected = false,
    onLongPress,
    onPress,
}) {
    const router = useRouter();

    const doctor = getDoctor(appointment);
    const status = appointment.status?.toLowerCase() ?? "unknown";
    const canCancel = ["pending", "confirmed"].includes(status);
    const statusConfig = STATUS_CONFIG[status] ?? STATUS_CONFIG.unknown;

    const paymentKey =
        appointment.payment_status?.toLowerCase() ?? "unknown";

    const [paymentPill, paymentPillText] =
        PAYMENT_CONFIG[paymentKey] ?? PAYMENT_CONFIG.unknown;

    const handleDoctorPress = () => {
        if (selectionMode || !doctor?.id) return;

        router.push(`/doctor/${doctor.id}`);
    };

    const handleCardPress = () => {
        if (selectionMode) {
            onPress?.();
        }
    };

    return (
        <Pressable
            onPress={handleCardPress}
            onLongPress={onLongPress}
            delayLongPress={350}
            accessibilityRole="button"
            accessibilityLabel={
                selectionMode
                    ? `${selected ? "Selected" : "Not selected"} appointment with ${doctor?.full_name ?? "doctor"}`
                    : `Appointment with ${doctor?.full_name ?? "doctor"}`
            }
            accessibilityState={{ selected }}
        >
            <MotiView
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                    type: "timing",
                    duration: 350,
                    delay: Math.min(index, 6) * 60,
                }}
                style={[
                    styles.card,
                    selectionMode && {
                        borderWidth: selected ? 2 : 1,
                        borderColor: selected
                            ? colors.primary
                            : "rgba(139, 92, 246, 0.25)",
                    },
                ]}
            >
                {/* Header */}
                <MotiView style={styles.cardHeader}>
                    {selectionMode && (
                        <View
                            style={{
                                marginRight: 10,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name={
                                    selected
                                        ? "checkmark-circle"
                                        : "ellipse-outline"
                                }
                                size={25}
                                color={
                                    selected
                                        ? colors.primary
                                        : colors.muted ?? colors.primary
                                }
                            />
                        </View>
                    )}

                    <MotiView style={styles.doctorIcon}>
                        <Ionicons
                            name="medkit-outline"
                            size={24}
                            color={colors.primary}
                        />
                    </MotiView>

                    <MotiView style={styles.doctorInfo}>
                        {selectionMode ? (
                            <MotiText
                                style={styles.doctorName}
                                numberOfLines={1}
                            >
                                {doctor?.full_name
                                    ? `Dr. ${doctor.full_name}`
                                    : "Doctor"}
                            </MotiText>
                        ) : (
                            <Pressable
                                onPress={handleDoctorPress}
                                hitSlop={6}
                                accessibilityRole="button"
                                accessibilityLabel="View doctor profile"
                            >
                                <MotiText
                                    style={styles.doctorName}
                                    numberOfLines={1}
                                >
                                    {doctor?.full_name
                                        ? `Dr. ${doctor.full_name}`
                                        : "Doctor"}
                                </MotiText>
                            </Pressable>
                        )}

                        <MotiText
                            style={styles.specialization}
                            numberOfLines={1}
                        >
                            {doctor?.specialization ??
                                "Specialization unavailable"}
                        </MotiText>
                    </MotiView>

                    <MotiView
                        style={[
                            styles.statusBadge,
                            statusConfig.badge,
                        ]}
                    >
                        <MotiView
                            style={[
                                styles.statusDot,
                                statusConfig.dot,
                            ]}
                        />

                        <MotiText
                            style={[
                                styles.statusText,
                                statusConfig.text,
                            ]}
                        >
                            {status}
                        </MotiText>
                    </MotiView>
                </MotiView>

                {/* Schedule */}
                <MotiView style={styles.scheduleBox}>
                    <ScheduleCell
                        icon="calendar-outline"
                        label="Starts"
                        value={formatAppointmentDate(
                            appointment.starts_at
                        )}
                    />

                    <MotiView style={styles.scheduleDivider} />

                    <ScheduleCell
                        icon="time-outline"
                        label="Ends"
                        value={formatAppointmentDate(
                            appointment.ends_at
                        )}
                    />
                </MotiView>

                {/* Fee and payment */}
                <MotiView style={styles.footerRow}>
                    <MotiView>
                        <MotiText style={styles.feeLabel}>
                            Consultation fee
                        </MotiText>

                        <MotiText style={styles.feeValue}>
                            {formatMoney(
                                appointment.consultation_fee
                            )}
                        </MotiText>
                    </MotiView>

                    <MotiView
                        style={[
                            styles.paymentPill,
                            paymentPill,
                        ]}
                    >
                        <MotiText
                            style={[
                                styles.paymentPillText,
                                paymentPillText,
                            ]}
                        >
                            {appointment.payment_status ?? "Unknown"}
                        </MotiText>
                    </MotiView>
                </MotiView>

                {/* Cancel is available outside selection mode */}
                {!selectionMode && canCancel && (
                    <MotiView style={styles.actionsRow}>
                        <MotiPressable
                            accessibilityRole="button"
                            accessibilityLabel="Cancel appointment"
                            onPress={() => onCancel?.(appointment.id)}
                            animate={({ pressed }) => {
                                "worklet";
                                return {
                                    opacity: pressed ? 0.75 : 1,
                                    scale: pressed ? 0.96 : 1,
                                };
                            }}
                            transition={{
                                type: "timing",
                                duration: 120,
                            }}
                            style={styles.cancelButton}
                        >
                            <Ionicons name="close-circle-outline" size={15} color={colors.danger} />

                            <MotiText style={styles.cancelText}>
                                Cancel
                            </MotiText>
                        </MotiPressable>
                    </MotiView>
                )}
            </MotiView>
        </Pressable>
    );
}