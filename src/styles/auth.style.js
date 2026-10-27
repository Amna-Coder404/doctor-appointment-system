import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    }

    ,
    content: {
        flexGrow: 1,
        padding: 24,
        paddingBottom: 32,
    }

    ,
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
    }

    ,
    hero: {
        alignItems: "center",
        marginTop: 42,
        marginBottom: 32,
    }

    ,
    logo: {
        width: 72,
        height: 72,
        borderRadius: 23,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    }

    ,
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    }

    ,
    subtitle: {
        fontSize: 14,
        lineHeight: 22,
        color: colors.textSecondary,
        textAlign: "center",
        marginTop: 10,
        maxWidth: 300,
    }

    ,
    form: {
        gap: 10,
    }

    ,
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
        marginTop: 8,
    }

    ,
    inputWrapper: {
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 15,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 15,
    }

    ,
    input: {
        flex: 1,
        color: colors.text,
        fontSize: 15,
        paddingVertical: 14,
    }

    ,
    forgotButton: {
        alignSelf: "flex-end",
        paddingVertical: 8,
    }

    ,
    forgotText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
    }

    ,
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: colors.primary,
        borderRadius: 15,
        paddingVertical: 17,
        marginTop: 14,
    }

    ,
    disabledButton: {
        opacity: 0.6,
    }

    ,
    submitText: {
        color: colors.textOnPrimary,
        fontSize: 16,
        fontWeight: "800",
    }

    ,
    switchRow: {
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 20,
    }

    ,
    switchText: {
        color: colors.textSecondary,
        fontSize: 14,
    }

    ,
    switchLink: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "800",
    }

    ,
    note: {
        textAlign: "center",
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 28,
    }

    ,
});


export default styles