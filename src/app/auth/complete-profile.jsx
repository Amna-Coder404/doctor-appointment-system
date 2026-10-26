import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../lib/colors";

export default function CompleteProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>
                Add a few details so your doctor can assist you.
            </Text>

            <Text style={styles.label}>Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="03XX XXXXXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your city"
                placeholderTextColor={colors.textMuted}
            />

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Save and continue</Text>
            </Pressable>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 27,
        fontWeight: "800",
        color: colors.text,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 22,
        color: colors.textSecondary,
        marginTop: 10,
        marginBottom: 32,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 9,
        marginTop: 16,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 15,
        fontSize: 15,
        color: colors.text,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 17,
        alignItems: "center",
        borderRadius: 14,
        marginTop: 30,
    },
    buttonText: {
        color: colors.textOnPrimary,
        fontSize: 15,
        fontWeight: "700",
    },
});