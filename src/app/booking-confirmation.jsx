import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import colors from "../lib/colors";
import styles from "../styles/bookingConfirmationScreen.style";

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

