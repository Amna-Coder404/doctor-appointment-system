
import { StyleSheet } from "react-native";
import colors from "../lib/colors";

export default StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 24,
    },
    backButton: {
        padding: 6,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        color: colors.text,
        fontSize: 23,
        fontWeight: "800",
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: 12,
        marginTop: 4,
    },
    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 12,
        backgroundColor: colors.dangerBackground ?? "#FEE2E2",
    },
    clearButtonText: {
        color: colors.danger ?? "#DC2626",
        fontSize: 12,
        fontWeight: "700",
    },
    listContent: {
        paddingBottom: 28,
        flexGrow: 1,
    },
    markAllButton: {
        alignSelf: "flex-start",
        marginBottom: 14,
    },
    markAllText: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
    },
    card: {
        flexDirection: "row",
        gap: 12,
        padding: 15,
        marginBottom: 12,
        borderRadius: 18,
        borderWidth: 1,
    },
    unreadCard: {
        backgroundColor: "#F0ECFF",
        borderColor: "#D9CEFF",
    },
    readCard: {
        backgroundColor: colors.surface ?? "#FFFFFF",
        borderColor: colors.border,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },
    unreadIcon: {
        backgroundColor: "#DDD5FF",
    },
    readIcon: {
        backgroundColor: "#EEEEF3",
    },
    cardContent: {
        flex: 1,
    },
    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    notificationTitle: {
        flex: 1,
        color: colors.text,
        fontSize: 14,
    },
    unreadTitle: {
        fontWeight: "800",
    },
    readTitle: {
        fontWeight: "600",
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#EF4444",
    },
    message: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 19,
        marginTop: 5,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    date: {
        color: colors.textSecondary,
        fontSize: 11,
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: colors.text,
        marginTop: 12,
        textAlign: "center",
    },
    retryButton: {
        marginTop: 16,
    },
    retryText: {
        color: colors.primary,
        fontWeight: "700",
    },
    emptyContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 75,
    },
    emptyIcon: {
        width: 82,
        height: 82,
        borderRadius: 28,
        backgroundColor: "#EDE9FE",
        alignItems: "center",
        justifyContent: "center",
    },
    emptyTitle: {
        color: colors.text,
        fontSize: 18,
        fontWeight: "800",
        marginTop: 18,
    },
    emptyMessage: {
        color: colors.textSecondary,
        textAlign: "center",
        lineHeight: 20,
        marginTop: 8,
    },
});
