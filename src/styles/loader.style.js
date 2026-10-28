import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
    },
    fullScreen: {
        flex: 1,
        backgroundColor: colors.background,
    },
    logoWrapper: {
        width: 84,
        height: 84,
        alignItems: "center",
        justifyContent: "center",
    },
    pulseRing: {
        position: "absolute",
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: colors.surfaceMint,
    },
    iconCircle: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surfaceMint,
        borderWidth: 1,
        borderColor: colors.border,
    },
    text: {
        fontSize: 14,
        color: colors.textSecondary,
    },
});

export default styles;