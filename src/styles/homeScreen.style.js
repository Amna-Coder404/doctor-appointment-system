import { StyleSheet } from "react-native";

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
});

export default styles
