import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const DANGER_BORDER = "rgba(220, 38, 38, 0.25)";

const CARD_SHADOW = {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
};

const styles = StyleSheet.create({
    // Screen
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.5,
        color: colors.text,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 21,
        color: colors.textSecondary,
        marginTop: 6,
    },
    list: {
        flex: 1,
        backgroundColor: colors.background,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        flexGrow: 1,
    },
    emptyListContent: {
        flexGrow: 1,
    },
    screenHeader: {
        marginBottom: 8,
    },

    // Summary (primary banner)
    summary: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 22,
        marginBottom: 8,
        padding: 18,
        backgroundColor: colors.primary,
        borderRadius: 22,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 5,
    },
    summaryIcon: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: "rgba(255,255,255,0.18)",
        alignItems: "center",
        justifyContent: "center",
    },
    summaryNumber: {
        fontSize: 26,
        fontWeight: "800",
        letterSpacing: -0.3,
        color: colors.textOnPrimary,
    },
    summaryLabel: {
        fontSize: 13,
        color: "rgba(255,255,255,0.8)",
        marginTop: 2,
    },

    // Filters
    filterList: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 14,
        paddingRight: 8,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
    },
    filterText: {
        fontSize: 13,
        fontWeight: "600",
    },
    filterCount: {
        minWidth: 22,
        height: 22,
        paddingHorizontal: 5,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
    },
    filterCountText: {
        fontSize: 11,
        fontWeight: "700",
    },

    // Appointment card
    card: {
        backgroundColor: colors.surface,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 16,
        ...CARD_SHADOW,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    doctorIcon: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: colors.doctorPlaceholder,
        alignItems: "center",
        justifyContent: "center",
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: -0.2,
        color: colors.text,
    },
    specialization: {
        fontSize: 12.5,
        color: colors.textSecondary,
        marginTop: 3,
    },

    // Status badge
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-start",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
        textTransform: "capitalize",
    },

    statusPending: { backgroundColor: colors.warningBackground },
    statusPendingText: { color: colors.warning },
    statusPendingDot: { backgroundColor: colors.warning },

    statusConfirmed: { backgroundColor: colors.successBackground },
    statusConfirmedText: { color: colors.success },
    statusConfirmedDot: { backgroundColor: colors.success },

    statusCompleted: { backgroundColor: colors.surfaceMint },
    statusCompletedText: { color: colors.primary },
    statusCompletedDot: { backgroundColor: colors.primary },

    statusCancelled: { backgroundColor: colors.dangerBackground },
    statusCancelledText: { color: colors.danger },
    statusCancelledDot: { backgroundColor: colors.danger },

    statusUnknown: { backgroundColor: colors.inputBackground },
    statusUnknownText: { color: colors.textSecondary },
    statusUnknownDot: { backgroundColor: colors.textMuted },

    // Schedule panel (Start | End)
    scheduleBox: {
        flexDirection: "row",
        alignItems: "stretch",
        marginTop: 16,
        backgroundColor: colors.inputBackground,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    scheduleCell: {
        flex: 1,
        padding: 12,
    },
    scheduleDivider: {
        width: 1,
        backgroundColor: colors.border,
        marginVertical: 12,
    },
    scheduleHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
    },
    scheduleIcon: {
        width: 26,
        height: 26,
        borderRadius: 8,
        backgroundColor: colors.iconBackground,
        alignItems: "center",
        justifyContent: "center",
    },
    scheduleLabel: {
        fontSize: 11.5,
        fontWeight: "600",
        color: colors.textSecondary,
        letterSpacing: 0.3,
        textTransform: "uppercase",
    },
    scheduleValue: {
        fontSize: 13,
        fontWeight: "600",
        lineHeight: 18,
        color: colors.text,
    },

    // Footer (fee + payment)
    footerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
    },
    feeLabel: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    feeValue: {
        fontSize: 18,
        fontWeight: "800",
        letterSpacing: -0.3,
        color: colors.primary,
        marginTop: 2,
    },
    paymentPill: {
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    paymentPillText: {
        fontSize: 11.5,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    pillSuccess: { backgroundColor: colors.successBackground },
    pillSuccessText: { color: colors.success },
    pillWarning: { backgroundColor: colors.warningBackground },
    pillWarningText: { color: colors.warning },
    pillDanger: { backgroundColor: colors.dangerBackground },
    pillDangerText: { color: colors.danger },
    pillNeutral: { backgroundColor: colors.inputBackground },
    pillNeutralText: { color: colors.textSecondary },

    // Actions (small cancel button)
    actionsRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 14,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    cancelButton: {
        height: 34,
        paddingHorizontal: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: DANGER_BORDER,
        backgroundColor: colors.dangerBackground,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
    },
    cancelText: {
        fontSize: 12,
        color: colors.danger,
        fontWeight: "700",
    },

    // Loading and pagination
    center: {
        flex: 1,
        minHeight: 240,
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
    },
    mutedText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    footer: {
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    // Empty state
    emptyCard: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 36,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 22,
        marginTop: 8,
        ...CARD_SHADOW,
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
    emptyTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
        textAlign: "center",
    },
    emptyText: {
        fontSize: 13,
        color: colors.textSecondary,
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
    },

    // Error state
    errorBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        padding: 14,
        backgroundColor: colors.dangerBackground,
        borderColor: DANGER_BORDER,
        borderWidth: 1,
        borderRadius: 14,
        marginTop: 12,
    },
    errorContent: {
        flex: 1,
    },
    errorTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.danger,
    },
    errorText: {
        fontSize: 12,
        color: colors.danger,
        marginTop: 5,
        lineHeight: 18,
    },
    retryButton: {
        alignSelf: "flex-start",
        marginTop: 10,
        paddingVertical: 5,
    },
    retryText: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.danger,
    },
});

export default styles;