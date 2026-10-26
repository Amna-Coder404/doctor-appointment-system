import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../lib/colors";

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.text,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 6,
    },
    emptyCard: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 28,
        marginTop: 30,
        borderWidth: 1,
        borderColor: colors.border,
    },
    iconCircle: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: colors.surfaceMint,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
    },
    emptyText: {
        fontSize: 14,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 8,
        lineHeight: 21,
    },
});