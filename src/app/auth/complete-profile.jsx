import { Pressable, Text, TextInput, View } from "react-native";
import colors from "../../lib/colors";
import styles from "../../styles/completeProfileScreen.stlye";

export default function CompleteProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete your profile</Text>
            <Text style={styles.subtitle}>
                Add a few details so your doctor can assist you.
            </Text>

            <Text style={styles.label}>Phone number</Text>
            <TextInput
                style={styles.input}
                placeholder="03XX XXXXXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>City</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your city"
                placeholderTextColor={colors.textMuted}
            />

            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>Save and continue</Text>
            </Pressable>
        </View>

    );
}

