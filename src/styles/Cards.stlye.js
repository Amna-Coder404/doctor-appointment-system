import { StyleSheet } from "react-native";
import colors from "../lib/colors";


const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 14,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.8,
    },
    image: {
        width: 92,
        height: 112,
        borderRadius: 14,
        backgroundColor: "#E5F3F1",
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    initial: {
        fontSize: 34,
        fontWeight: "700",
        color: colors.primary,
    },
    details: {
        flex: 1,
        gap: 5,
    },
    name: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172B2A",
    },
    specialization: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.primary,
    },
    qualification: {
        fontSize: 12,
        color: "#6B7280",
    },
    experience: {
        fontSize: 12,
        color: "#6B7280",
    },
    footer: {
        marginTop: 7,
        gap: 5,
    },
    fee: {
        fontSize: 15,
        fontWeight: "700",
        color: "#172B2A",
    },
    viewDetails: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: "600",
    },
});

export default styles
