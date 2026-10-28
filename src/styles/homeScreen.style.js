import { StyleSheet } from "react-native";
import colors from "../lib/colors";

export default StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, paddingBottom: 40 },

    // Header
    header: {
        paddingTop: 4,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    avatar: {
        width: 46, height: 46, borderRadius: 23
    },
    avatarPlaceholder: {
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    greeting: {
        fontSize: 22,
        color: colors.text,
        marginTop: 10,
    },
    greetingBold: { fontWeight: "700" },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 18,
    },

    // Doctor card
    doctorCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        marginBottom: 20,
        borderRadius: 22,
        backgroundColor: colors.surface,
        shadowColor: colors.text,
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 1,
    },
    doctorImage: { width: 88, height: 88, borderRadius: 12 },
    doctorPlaceholder: {
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    doctorInitial: {
        color: colors.textOnPrimary,
        fontSize: 30,
        fontWeight: "700",
    },
    doctorDetails: { flex: 1, marginLeft: 16 },
    doctorName: { fontSize: 15, fontWeight: "700", color: colors.text },
    doctorSpecialization: {
        fontSize: 14,
        fontStyle: "italic",
        color: colors.textMuted,
        marginTop: 2,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 4,
    },
    timeText: { fontSize: 12, color: colors.text },
    doctorFee: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },


    arrowBtn: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 34,
        height: 34,
        borderRadius: 8,
        backgroundColor: colors.text,
        alignItems: "center",
        justifyContent: "center",
    },
});