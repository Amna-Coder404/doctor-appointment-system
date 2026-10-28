import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

export default function DoctorSearch({ value, onChangeText, onFilterPress }) {
    return (
        <View style={styles.row}>
            <View style={styles.box}>
                <Ionicons name="search" size={22} color="#1B1B2F" />

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="Search"
                    placeholderTextColor="#9AA0A6"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="search"
                />

                {value.length > 0 && (
                    <Pressable onPress={() => onChangeText("")} hitSlop={10}>
                        <Ionicons name="close-circle" size={20} color="#9AA0A6" />
                    </Pressable>
                )}
            </View>

            <Pressable onPress={onFilterPress} hitSlop={8}>
                <Ionicons name="options-outline" size={30} color="#1B1B2F" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginTop: 14,
        marginBottom: 24,
    },
    box: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        height: 48,
        paddingHorizontal: 16,
        borderRadius: 14,
        backgroundColor: "#FFFFFF",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontStyle: "italic",
        color: "#1B1B2F",
    },
});