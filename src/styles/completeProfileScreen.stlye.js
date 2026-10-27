import { StyleSheet } from "react-native";
import colors from "../lib/colors";

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


export default styles