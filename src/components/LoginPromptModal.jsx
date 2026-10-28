import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import colors from "../lib/colors";
import styles from "../styles/loginPromptModal.style";

export default function LoginPromptModal({ visible, onLogin, onClose }) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Tap outside to close */}
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

                {/* Card */}
                <MotiView
                    from={{ opacity: 0, scale: 0.85, translateY: 30 }}
                    animate={{ opacity: 1, scale: 1, translateY: 0 }}
                    transition={{ type: "spring", damping: 14, stiffness: 140 }}
                    style={styles.card}
                >
                    <Pressable
                        style={styles.closeBtn}
                        onPress={onClose}
                        hitSlop={10}
                        accessibilityLabel="Close"
                    >
                        <Ionicons name="close" size={18} color={colors.text} />
                    </Pressable>

                    <MotiView
                        from={{ scale: 0, rotate: "-30deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        transition={{
                            type: "spring",
                            damping: 10,
                            stiffness: 150,
                            delay: 150,
                        }}
                        style={styles.iconCircle}
                    >
                        <Ionicons
                            name="lock-closed"
                            size={36}
                            color={colors.primary}
                        />
                    </MotiView>

                    <MotiText
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 300 }}
                        style={styles.title}
                    >
                        Sign in to book your appointment
                    </MotiText>

                    <MotiText
                        from={{ opacity: 0, translateY: 10 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 400 }}
                        style={styles.description}
                    >
                        Sign in with Google to confirm your appointment and
                        manage your bookings.
                    </MotiText>

                    <MotiView
                        from={{ opacity: 0, translateY: 14 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: "timing", duration: 300, delay: 500 }}
                        style={{ width: "100%", alignItems: "center" }}
                    >
                        <Pressable style={styles.primaryBtn} onPress={onLogin}>
                            <Text style={styles.primaryText}>
                                Continue to Login
                            </Text>
                        </Pressable>

                        <Pressable style={styles.secondaryBtn} onPress={onClose}>
                            <Text style={styles.secondaryText}>Not now</Text>
                        </Pressable>
                    </MotiView>
                </MotiView>
            </View>
        </Modal>
    );
}