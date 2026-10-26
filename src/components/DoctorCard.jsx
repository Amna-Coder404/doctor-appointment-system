
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PRIMARY = "#0F766E";

export default function DoctorCard({ doctor, onPress }) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            {doctor.profile_image_url ? (
                <Image
                    source={{ uri: doctor.profile_image_url }}
                    style={styles.image}
                />
            ) : (
                <View style={[styles.image, styles.placeholder]}>
                    <Text style={styles.initial}>
                        {doctor.full_name?.charAt(0)?.toUpperCase() || "D"}
                    </Text>
                </View>
            )}

            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>
                    {doctor.full_name}
                </Text>

                <Text style={styles.specialization} numberOfLines={1}>
                    {doctor.specialization}
                </Text>

                {!!doctor.qualification && (
                    <Text style={styles.qualification} numberOfLines={1}>
                        {doctor.qualification}
                    </Text>
                )}

                <Text style={styles.experience}>
                    {doctor.experience_years} years experience
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.fee}>
                        Fee {Number(doctor.consultation_fee).toLocaleString()}
                    </Text>

                    <Text style={styles.viewDetails}>
                        View details →
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 14,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 14,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.8,
    },
    image: {
        width: 92,
        height: 112,
        borderRadius: 14,
        backgroundColor: "#E5F3F1",
    },
    placeholder: {
        justifyContent: "center",
        alignItems: "center",
    },
    initial: {
        fontSize: 34,
        fontWeight: "700",
        color: PRIMARY,
    },
    details: {
        flex: 1,
        gap: 5,
    },
    name: {
        fontSize: 17,
        fontWeight: "700",
        color: "#172B2A",
    },
    specialization: {
        fontSize: 14,
        fontWeight: "600",
        color: PRIMARY,
    },
    qualification: {
        fontSize: 12,
        color: "#6B7280",
    },
    experience: {
        fontSize: 12,
        color: "#6B7280",
    },
    footer: {
        marginTop: 7,
        gap: 5,
    },
    fee: {
        fontSize: 15,
        fontWeight: "700",
        color: "#172B2A",
    },
    viewDetails: {
        color: PRIMARY,
        fontSize: 12,
        fontWeight: "600",
    },
});
