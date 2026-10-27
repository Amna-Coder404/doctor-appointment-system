import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";

export default function AppointmentsScreen() {
    return (

        <View style={styles.container}>
            <Text style={styles.title}>My Appointments</Text>
            <Text style={styles.subtitle}>
                Manage your upcoming and previous visits.
            </Text>

            <View style={styles.emptyCard}>
                <View style={styles.iconCircle}>
                    <Ionicons
                        name="calendar-outline"
                        size={34}
                        color={colors.primary}
                    />
                </View>

                <Text style={styles.emptyTitle}>
                    No appointments yet
                </Text>

                <Text style={styles.emptyText}>
                    Your booked appointments will appear here.
                </Text>
            </View>
        </View>

    );
}

