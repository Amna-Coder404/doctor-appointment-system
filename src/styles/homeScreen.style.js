import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    content: {
        padding: 18,
        paddingBottom: 32,
        flexGrow: 1,
    },
    header: {
        marginBottom: 22,
        paddingHorizontal: 16
    },
    greeting: {
        fontSize: 27,
        fontWeight: "800",
        color: "#172B2A",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 21,
        marginTop: 7,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#172B2A",
        marginTop: 26,
    },
    empty: {
        paddingVertical: 36,
        alignItems: "center",
    },
    message: {
        color: "#6B7280",
        textAlign: "center",
    },
    // Doctor card
    doctorCard: {
        flexDirection: "row",
        gap: 14,
        padding: 14,
        marginBottom: 14,
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
    },
    doctorImage: {
        width: 86,
        height: 86,
        borderRadius: 16,
    },
    doctorPlaceholder: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.doctorPlaceholder,
    },
    doctorInitial: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.primary,
    },
    doctorDetails: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.text,
    },
    doctorSpecialization: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.primary,
        marginTop: 3,
    },
    doctorQualification: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 3,
    },
    doctorExperience: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 3,
    },
    doctorFooter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    doctorFee: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.text,
    },
    doctorViewDetails: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primary,
    },
});

export default styles
