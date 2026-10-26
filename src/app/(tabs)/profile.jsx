import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../lib/colors";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>
            <Text style={styles.subtitle}>
                Manage your personal information.
            </Text>

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Ionicons
                        name="person"
                        size={36}
                        color={colors.primary}
                    />
                </View>

                <Text style={styles.name}>Your Name</Text>
                <Text style={styles.email}>
                    Sign in to view your profile
                </Text>
            </View>

            <View style={styles.infoCard}>
                <Ionicons
                    name="person-outline"
                    size={22}
                    color={colors.primary}
                />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Personal details</Text>
                    <Text style={styles.infoValue}>
                        Your name, phone number and city
                    </Text>
                </View>
                <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.textMuted}
                />
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
    profileCard: {
        alignItems: "center",
        backgroundColor: colors.surface,
        borderRadius: 20,
        padding: 24,
        marginTop: 28,
        borderWidth: 1,
        borderColor: colors.border,
    },
    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41,
        backgroundColor: colors.doctorPlaceholder,
        alignItems: "center",
        justifyContent: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
        marginTop: 14,
    },
    email: {
        color: colors.textSecondary,
        fontSize: 13,
        marginTop: 5,
    },
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surface,
        padding: 18,
        borderRadius: 16,
        marginTop: 18,
        borderWidth: 1,
        borderColor: colors.border,
    },
    infoContent: {
        flex: 1,
        marginLeft: 14,
    },
    infoLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
    },
    infoValue: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 5,
    },
});