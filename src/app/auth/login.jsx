import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../lib/colors";

export default function LoginScreen() {
    const router = useRouter();

    return (

        <View style={styles.container}>
            <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons
                    name="arrow-back"
                    size={23}
                    color={colors.text}
                />
            </Pressable>

            <View style={styles.hero}>
                <View style={styles.logo}>
                    <Ionicons
                        name="heart"
                        size={36}
                        color={colors.textOnPrimary}
                    />
                </View>

                <Text style={styles.title}>Welcome to MediBook</Text>
                <Text style={styles.subtitle}>
                    Sign in to book appointments and manage your visits.
                </Text>
            </View>

            <Pressable style={styles.googleButton}>
                <Ionicons name="logo-google" size={21} color="#4285F4" />
                <Text style={styles.googleText}>
                    Continue with Google
                </Text>
            </Pressable>

            <Text style={styles.note}>
                Your health journey starts with the right care.
            </Text>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
    },
    hero: {
        alignItems: "center",
        marginTop: 75,
        marginBottom: 45,
    },
    logo: {
        width: 78,
        height: 78,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },
    title: {
        fontSize: 27,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 23,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 12,
        maxWidth: 300,
    },
    googleButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 15,
        paddingVertical: 17,
    },
    googleText: {
        color: colors.text,
        fontSize: 15,
        fontWeight: "700",
    },
    note: {
        textAlign: "center",
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 25,
    },
});