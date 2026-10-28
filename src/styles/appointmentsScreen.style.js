import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    // Screen
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
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
        paddingTop: 16,
        paddingBottom: 32,
        flexGrow: 1,
    },
    emptyListContent: {
        flexGrow: 1,
    },
    screenHeader: {
        marginBottom: 20,
    },

    // Summary
    summary: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 20,
        marginBottom: 8,
        padding: 16,
        backgroundColor: colors.surface,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
    },
    summaryIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.surfaceMint,
        alignItems: "center",
        justifyContent: "center",
    },
    summaryNumber: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.text,
    },
    summaryLabel: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 2,
    },

    // Filters
    filterList: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 12,
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
        borderRadius: 18,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 16,
        marginBottom: 16,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    doctorIcon: {
        width: 46,
        height: 46,
        borderRadius: 14,
        backgroundColor: colors.doctorPlaceholder,
        alignItems: "center",
        justifyContent: "center",
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.text,
    },
    specialization: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statusBadge: {
        borderRadius: 20,
        paddingHorizontal: 9,
        paddingVertical: 6,
        maxWidth: 100,
    },

    statusPending: { backgroundColor: colors.warning },
    statusConfirmed: { backgroundColor: colors.success },
    statusCompleted: { backgroundColor: colors.primary },
    statusCancelled: { backgroundColor: colors.danger },
    statusUnknown: { backgroundColor: colors.textSecondary },
    statusText: {
        color: colors.textOnPrimary,
        fontSize: 10,
        fontWeight: "700",
        textTransform: "capitalize",
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderLight,
        marginVertical: 16,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        marginBottom: 16,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 12,
        color: colors.textSecondary,
    },
    detailValue: {
        fontSize: 13,
        color: colors.text,
        fontWeight: "500",
        marginTop: 4,
    },
    paymentRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    paymentValue: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.text,
        textTransform: "capitalize",
    },
    cancelButton: {
        minHeight: 46,
        marginTop: 16,
        borderWidth: 1,
        borderColor: "#FECACA",
        backgroundColor: colors.dangerBackground,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    cancelText: {
        fontSize: 13,
        color: colors.danger,
        fontWeight: "600",
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
        borderColor: "#FECACA",
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 12,
    },
    errorContent: {
        flex: 1,
    },
    errorTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#991B1B",
    },
    errorText: {
        fontSize: 12,
        color: "#991B1B",
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