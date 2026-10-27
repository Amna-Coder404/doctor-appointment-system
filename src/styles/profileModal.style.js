
import { StyleSheet } from "react-native";
import colors from "../lib/colors";

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "flex-end",
    },
    modal: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 26,
        borderTopRightRadius: 26,
        padding: 22,
        paddingBottom: 32,
        maxHeight: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 22,
    },
    title: {
        fontSize: 23,
        fontWeight: "800",
        color: colors.text,
    },
    subtitle: {
        fontSize: 13,
        color: colors.textSecondary,
        marginTop: 5,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
        alignItems: "center",
        justifyContent: "center",
    },
    loader: {
        marginVertical: 50,
    },
    photoContainer: {
        alignItems: "center",
        marginBottom: 22,
    },
    avatar: {
        width: 94,
        height: 94,
        borderRadius: 47,
    },
    avatarPlaceholder: {
        width: 94,
        height: 94,
        borderRadius: 47,
        backgroundColor: colors.doctorPlaceholder,
        alignItems: "center",
        justifyContent: "center",
    },
    cameraIcon: {
        position: "absolute",
        top: 62,
        marginLeft: 65,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: colors.background,
    },
    changePhoto: {
        marginTop: 12,
        fontSize: 13,
        fontWeight: "700",
        color: colors.primary,
    },
    label: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        height: 52,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingHorizontal: 15,
        color: colors.text,
        fontSize: 14,
    },
    readOnlyInput: {
        opacity: 0.7,
    },
    error: {
        color: "#DC2626",
        fontSize: 13,
        marginTop: 12,
        lineHeight: 19,
    },
    saveButton: {
        height: 53,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
    },
    disabledButton: {
        opacity: 0.65,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "800",
    },
});

export default styles;
