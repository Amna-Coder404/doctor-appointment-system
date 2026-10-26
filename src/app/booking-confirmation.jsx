import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../lib/colors";

export default function BookingConfirmationScreen() {
    const router = useRouter();

    return (

        <View style={styles.container}>
            <View style={styles.successCircle}>
                <Ionicons
                    name="checkmark"
                    size={48}
                    color={colors.success}
                />
            </View>

            <Text style={styles.title}>Appointment requested</Text>
            <Text style={styles.subtitle}>
                Your appointment details will appear here after a successful
                booking.
            </Text>

            <Pressable
                style={styles.button}
                onPress={() => router.replace("/(tabs)/appointments")}
            >
                <Text style={styles.buttonText}>
                    View my appointments
                </Text>
            </Pressable>

            <Pressable
                style={styles.secondaryButton}
                onPress={() => router.replace("/(tabs)")}
            >
                <Text style={styles.secondaryText}>Back to Home</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        padding: 26,
    },
    successCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.successBackground,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },
    title: {
        fontSize: 25,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 23,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 12,
        marginBottom: 30,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 14,
        padding: 17,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: colors.textOnPrimary,
        fontSize: 15,
        fontWeight: "700",
    },
    secondaryButton: {
        padding: 16,
        marginTop: 8,
    },
    secondaryText: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "700",
    },
});