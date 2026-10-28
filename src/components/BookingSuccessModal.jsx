import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const BLUE = "#3D6BFF";
const DARK = "#1B1B2F";
const GREEN = "#22C55E";

export default function BookingSuccessModal({
    visible,
    onViewAppointments,
    onGoHome,
}) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            statusBarTranslucent
            onRequestClose={onGoHome}
        >
            <View style={styles.overlay}>
                {/* Backdrop */}
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 250 }}
                    style={styles.backdrop}
                />

                {/* Card */}
                <MotiView
                    from={{ opacity: 0, scale: 0.85, translateY: 30 }}
                    animate={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ type: "spring", damping: 14, stiffness: 140 }}
                    style={styles.card}
                >
                    {/* Check circle with pulse */}
                    <View style={styles.circleWrap}>
                        <MotiView
                            from={{ opacity: 0.45, scale: 1 }}
                            animate={{ opacity: 0, scale: 1.7 }}
                            transition={{
                                type: "timing",
                                duration: 1500,
                                loop: true,
                                delay: 500,
                            }}
                            style={styles.pulse}
                        />
                        <MotiView
                            from={{ scale: 0, rotate: "-45deg" }}
                            animate={{ scale: 1, rotate: "0deg" }}
                            transition={{
                                type: "spring",
                                damping: 10,
                                stiffness: 150,
                                delay: 200,
                            }}
                            style={styles.circle}
                        >
                            <Ionicons name="checkmark" size={46} color="#fff" />
                        </MotiView>
                    </View>

                    <MotiText
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 400 }}
                        style={styles.title}
                    >
                        Appointment requested
                    </MotiText>

                    <MotiText
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 500 }}
                        style={styles.subtitle}
                    >
                        Your booking has been sent. You can track its status in
                        your appointments.
                    </MotiText>

                    <MotiView
                        from={{ opacity: 0, translateY: 14 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 600 }}
                        style={styles.actions}
                    >
                        <Pressable style={styles.primaryBtn} onPress={onViewAppointments}>
                            <Text style={styles.primaryText}>
                                View my appointments
                            </Text>
                        </Pressable>

                        <Pressable style={styles.secondaryBtn} onPress={onGoHome}>
                            <Text style={styles.secondaryText}>Back to Home</Text>
                        </Pressable>
                    </MotiView>
                </MotiView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(27,27,47,0.55)",
    },
    card: {
        width: "100%",
        paddingVertical: 32,
        paddingHorizontal: 22,
        borderRadius: 28,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 12,
    },
    circleWrap: {
        width: 96,
        height: 96,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 22,
    },
    pulse: {
        position: "absolute",
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: GREEN,
    },
    circle: {
        width: 84,
        height: 84,
        borderRadius: 42,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: GREEN,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: DARK,
        textAlign: "center",
    },
    subtitle: {
        marginTop: 8,
        fontSize: 14,
        lineHeight: 21,
        color: "#6B7280",
        textAlign: "center",
    },
    actions: { width: "100%", marginTop: 26, gap: 12 },
    primaryBtn: {
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BLUE,
    },
    primaryText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
    secondaryBtn: {
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#D5D9E0",
    },
    secondaryText: { fontSize: 15, fontWeight: "600", color: DARK },
});