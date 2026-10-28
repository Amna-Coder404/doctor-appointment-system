import { StyleSheet } from "react-native";
import colors from "../lib/colors";





const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.surface },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: colors.background,
    },
    header: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },
    backButton: { width: 40 },
    headerTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
    headerSpace: { width: 40 },
    content: { paddingBottom: 20 },
    hero: {
        marginHorizontal: 18,
        height: 280,
        overflow: "hidden",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        backgroundColor: colors.doctorPlaceholder,
    },
    image: {
        width: "100%",
        height: "100%"
    },
    placeholder: { alignItems: "center", justifyContent: "center" },
    identity: { paddingHorizontal: 22, paddingTop: 16 },
    name: { fontSize: 20, fontWeight: "800", color: colors.text },
    specialization: {
        marginTop: 5,
        fontSize: 14,
        color: colors.primary,
        fontWeight: "600",
    },
    qualification: {
        marginTop: 4,
        fontSize: 13,
        color: colors.textSecondary,
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 26,
        paddingHorizontal: 16,
    },
    stat: { flex: 1, alignItems: "center", gap: 7 },
    statIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.surfaceMint,
        alignItems: "center",
        justifyContent: "center",
    },
    statValue: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.text,
        textAlign: "center",
    },
    statLabel: { fontSize: 12, color: colors.textSecondary },
    section: { paddingHorizontal: 22, marginTop: 25 },
    sectionTitle: {
        fontSize: 17,
        fontWeight: "800",
        color: colors.text,
        marginBottom: 9,
    },
    bio: { fontSize: 13, lineHeight: 20, color: colors.textSecondary },
    readMore: {
        color: colors.primary,
        fontSize: 13,
        fontWeight: "700",
        marginTop: 4,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        paddingVertical: 10,
    },
    infoContent: { flex: 1 },
    infoLabel: { fontSize: 12, color: colors.textSecondary },
    infoValue: {
        fontSize: 14,
        color: colors.text,
        marginTop: 3,
        lineHeight: 20,
    },
    bottom: {
        paddingHorizontal: 22,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: colors.surface,
    },
    bookButton: {
        minHeight: 50,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    buttonPressed: { opacity: 0.82 },
    bookButtonText: {
        color: colors.textOnPrimary,
        fontSize: 15,
        fontWeight: "700",
    },
    error: { color: colors.danger, textAlign: "center", marginBottom: 12 },
    backText: { color: colors.primary, fontWeight: "700" },
});


export default styles