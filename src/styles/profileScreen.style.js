import { StyleSheet } from "react-native";
import colors from "../lib/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surfaceMint,
    },

    // Top banner
    banner: {
        height: 190,
        paddingHorizontal: 20,
        paddingTop: 24,
        borderBottomLeftRadius: 36,
        borderBottomRightRadius: 36,
        backgroundColor: colors.primary,
    },
    bannerTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: colors.textOnPrimary,
    },
    bannerSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textOnPrimary,
        opacity: 0.8,
    },

    // Main card
    profileCard: {
        marginHorizontal: 20,
        marginTop: -50,
        paddingHorizontal: 20,
        paddingBottom: 22,
        paddingTop: 58,
        alignItems: "center",
        borderRadius: 26,
        backgroundColor: colors.surface,
        shadowColor: colors.text,
        shadowOpacity: 0.12,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    guestCard: {
        paddingTop: 24,
    },

    // Avatar (overlaps banner)
    avatar: {
        position: "absolute",
        top: -48,
        alignSelf: "center",
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderWidth: 4,
        borderColor: colors.surface,
        backgroundColor: colors.doctorPlaceholder,
        shadowColor: colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    avatarImage: { width: "100%", height: "100%" },

    name: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.text,
        textAlign: "center",
    },
    email: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
        textAlign: "center",
    },

    // Info rows
    infoCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        width: "100%",
        marginTop: 14,
        padding: 14,
        borderRadius: 16,
        backgroundColor: colors.inputBackground,
    },
    infoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.iconBackground,
    },
    infoContent: { flex: 1 },
    infoLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.textMuted,
    },
    infoValue: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
    },

    // Buttons (small, side by side)
    actions: {
        flexDirection: "row",
        gap: 12,
        width: "100%",
        marginTop: 22,
    },
    button: {
        flex: 1,
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        borderRadius: 22,
        backgroundColor: colors.primary,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textOnPrimary,
    },
    signOutButton: {
        flex: 1,
        height: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.danger,
        backgroundColor: colors.surface,
    },
    signOutText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.danger,
    },

    // Guest sign in button
    signInButton: {
        height: 44,
        marginTop: 18,
        paddingHorizontal: 36,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: colors.primary,
    },
});