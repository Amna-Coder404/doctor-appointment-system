import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        marginTop: 8,
    },
    iconCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surfaceMint,
        marginBottom: 16,
    },
    title: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 13,
        color: colors.textSecondary,
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
    },
});

export default styles;