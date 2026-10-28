import { StyleSheet } from "react-native";
import colors from "../lib/colors";

export default StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    scrollContent: { flexGrow: 1 },

    // Hero
    hero: { height: 330, backgroundColor: colors.doctorPlaceholder },
    heroImage: { width: "100%", height: "100%", resizeMode: "cover" },
    heroFallback: { alignItems: "center", justifyContent: "center" },
    heroInitial: { fontSize: 90, fontWeight: "800", color: colors.primary },
    backButton: {
        position: "absolute",
        top: 48,
        left: 18,
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface,
    },

    // Sheet
    sheet: {
        flex: 1,
        marginTop: -50,
        paddingHorizontal: 20,
        paddingBottom: 36,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: colors.background,
    },

    // Doctor card
    doctorCard: {
        marginTop: -50,
        marginBottom: 28,
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 14,
        alignItems: "center",
        gap: 6,
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOpacity: 0.35,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 8 },
        elevation: 8,
    },
    doctorName: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.textOnPrimary,
    },
    doctorLine: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textOnPrimary,
        textAlign: "center",
    },

    sectionTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 14,
        marginLeft: 4,
    },

    // Dates
    dateWrap: {
        marginBottom: 28,
        borderRadius: 20,
        backgroundColor: colors.surface,
        shadowColor: colors.text,
        shadowOpacity: 0.18,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    dateList: { gap: 8, paddingHorizontal: 12, paddingVertical: 14 },
    dateItem: {
        width: 54,
        height: 70,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    dateItemActive: { backgroundColor: colors.primaryLight },
    dateDay: { fontSize: 14, fontWeight: "700", color: colors.text },
    dateNumber: { fontSize: 15, fontWeight: "600", color: colors.text },
    activeText: { color: colors.textOnPrimary },

    // Times
    timeList: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 24,
    },
    timeButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    timeButtonActive: {
        backgroundColor: colors.warning,
        borderColor: colors.warning,
    },
    timeText: { fontSize: 12, color: colors.textSecondary },
    timeTextActive: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.textOnPrimary,
    },

    // Confirm
    confirmButton: {
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    confirmDisabled: { opacity: 0.5 },
    confirmText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.textOnPrimary,
    },

    // States
    stateContainer: {
        minHeight: 80,
        alignItems: "center",
        justifyContent: "center",
        padding: 12,
        marginBottom: 16,
        gap: 10,
    },
    stateText: {
        fontSize: 13,
        color: colors.textSecondary,
        textAlign: "center",
    },
    errorText: { color: colors.danger, textAlign: "center" },
    retryButton: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 10,
        backgroundColor: colors.iconBackground,
    },
    retryText: { color: colors.primary, fontWeight: "700" },

    // Login card
    loginCard: {
        marginTop: 20,
        padding: 22,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: colors.surfaceMint,
        borderWidth: 1,
        borderColor: colors.border,
    },
    loginIcon: { fontSize: 30, marginBottom: 10 },
    loginTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
        marginBottom: 8,
    },
    loginDescription: {
        fontSize: 13,
        lineHeight: 20,
        color: colors.textSecondary,
        textAlign: "center",
        marginBottom: 18,
    },
    loginButton: {
        width: "100%",
        paddingVertical: 13,
        borderRadius: 14,
        alignItems: "center",
        backgroundColor: colors.primary,
    },
    loginButtonText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textOnPrimary,
    },
});