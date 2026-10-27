import { StyleSheet } from "react-native";
import colors from "../lib/colors";

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

export default styles