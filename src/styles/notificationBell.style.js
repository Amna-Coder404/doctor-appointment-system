
import { StyleSheet } from "react-native";
import colors from "../lib/colors";

export default StyleSheet.create({
    // Notification Bell
    container: {
        width: 46,
        height: 46,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.surface || "#F1EDFF",
    },

    badge: {
        position: "absolute",
        top: -3,
        right: -3,
        minWidth: 19,
        height: 19,
        paddingHorizontal: 4,
        borderRadius: 10,
        backgroundColor: "#EF4444",
        borderWidth: 2,
        borderColor: colors.background || "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },

    badgeText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "800",
    },

    // Notification Card
    card: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
        marginBottom: 12,
        borderRadius: 20,
        borderWidth: 1,
        gap: 12,
    },

    unreadCard: {
        backgroundColor: colors.surface || "#F5F2FF",
        borderColor: colors.primary + "35",
    },

    readCard: {
        backgroundColor: colors.background || "#FFFFFF",
        borderColor: colors.border || "#E5E7EB",
    },

    iconContainer: {
        width: 46,
        height: 46,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    unreadIcon: {
        backgroundColor: colors.primary + "18",
    },

    readIcon: {
        backgroundColor: colors.surface || "#F3F4F6",
    },

    cardContent: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },

    notificationTitle: {
        flex: 1,
        fontSize: 15,
        lineHeight: 21,
    },

    unreadTitle: {
        color: colors.text,
        fontWeight: "700",
    },

    readTitle: {
        color: colors.textSecondary,
        fontWeight: "600",
    },

    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },

    message: {
        color: colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 12,
    },

    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },

    date: {
        flex: 1,
        color: colors.textSecondary,
        fontSize: 11,
    },
});
