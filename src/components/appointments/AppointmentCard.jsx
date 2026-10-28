import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";

import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";
import { formatAppointmentDate, formatMoney } from "../../utils/utils";

const STATUS_STYLES = {
    pending: styles.statusPending,
    confirmed: styles.statusConfirmed,
    completed: styles.statusCompleted,
    cancelled: styles.statusCancelled,
};

const getDoctor = (appointment) => {
    const relation = appointment.doctors;
    return Array.isArray(relation) ? relation[0] : relation;
};

function DetailRow({ icon, label, value }) {
    return (
        <MotiView style={styles.detailRow}>
            <Ionicons name={icon} size={19} color={colors.primary} />
            <MotiView style={styles.detailContent}>
                <MotiText style={styles.detailLabel}>{label}</MotiText>
                <MotiText style={styles.detailValue}>{value}</MotiText>
            </MotiView>
        </MotiView>
    );
}

export default function AppointmentCard({ appointment, onCancel }) {
    const doctor = getDoctor(appointment);
    const status = appointment.status?.toLowerCase() ?? "unknown";
    const canCancel = ["pending", "confirmed"].includes(status);
    const statusStyle = STATUS_STYLES[status] ?? styles.statusUnknown;

    const router = useRouter();
    // go to doctor screen
    const handleDoctorPress = () => {
        if (!doctor?.id) return;

        router.push(`/doctor/${doctor.id}`);
    };
    return (
        <MotiView
            from={{ opacity: 0, translateY: 12 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.card}
        >
            <MotiView style={styles.cardHeader}>
                <MotiView style={styles.doctorIcon}>
                    <Ionicons
                        name="medkit-outline"
                        size={24}
                        color={colors.primary}
                    />
                </MotiView>

                <MotiView style={styles.doctorInfo}>

                    <Pressable onPress={handleDoctorPress}>
                        <MotiText style={styles.doctorName}>
                            {doctor?.full_name ? `Dr. ${doctor.full_name}` : "Doctor"}
                        </MotiText>
                    </Pressable>
                    <MotiText style={styles.specialization}>
                        {doctor?.specialization ?? "Specialization unavailable"}
                    </MotiText>
                </MotiView>

                <MotiView style={[styles.statusBadge, statusStyle]}>
                    <MotiText style={styles.statusText}>{status}</MotiText>
                </MotiView>
            </MotiView>

            <MotiView style={styles.divider} />

            <DetailRow
                icon="calendar-outline"
                label="Appointment date"
                value={formatAppointmentDate(appointment.starts_at)}
            />
            <DetailRow
                icon="time-outline"
                label="Ends at"
                value={formatAppointmentDate(appointment.ends_at)}
            />
            <DetailRow
                icon="wallet-outline"
                label="Consultation fee"
                value={formatMoney(appointment.consultation_fee)}
            />

            <MotiView style={styles.paymentRow}>
                <MotiText style={styles.detailLabel}>Payment status</MotiText>
                <MotiText style={styles.paymentValue}>
                    {appointment.payment_status ?? "Unknown"}
                </MotiText>
            </MotiView>

            {canCancel && (
                <MotiPressable
                    accessibilityRole="button"
                    accessibilityLabel="Cancel appointment"
                    onPress={() => onCancel(appointment.id)}
                    animate={({ pressed }) => {
                        "worklet";
                        return {
                            opacity: pressed ? 0.75 : 1,
                            scale: pressed ? 0.98 : 1,
                        };
                    }}
                    transition={{ type: "timing", duration: 120 }}
                    style={styles.cancelButton}
                >
                    <Ionicons
                        name="close-circle-outline"
                        size={19}
                        color={colors.danger}
                    />
                    <MotiText style={styles.cancelText}>
                        Cancel appointment
                    </MotiText>
                </MotiPressable>
            )}
        </MotiView>
    );
}