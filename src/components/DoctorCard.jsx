import { Ionicons } from "@expo/vector-icons";
import { MotiPressable } from "moti/interactions";
import { Image, Text, View } from "react-native";

import colors from "../lib/colors";
import styles from "../styles/homeScreen.style";

export default function DoctorCard({ doctor, onPress }) {
    const time = doctor.available_time || "10:30 AM-3:30";


    return (
        <MotiPressable
            onPress={onPress}
            from={{ opacity: 0, translateY: 12 }}
            animate={({ pressed }) => {
                "worklet";
                return { opacity: 1, translateY: 0, scale: pressed ? 0.98 : 1 };
            }}
            transition={{ type: "timing", duration: 200 }}
            style={styles.doctorCard}
        >
            {doctor.profile_image_url ? (
                <Image
                    source={{ uri: doctor.profile_image_url }}
                    style={styles.doctorImage}
                />
            ) : (
                <View style={[styles.doctorImage, styles.doctorPlaceholder]}>
                    <Text style={styles.doctorInitial}>
                        {doctor.full_name?.charAt(0)?.toUpperCase() || "D"}
                    </Text>
                </View>
            )}

            <View style={styles.doctorDetails}>
                <Text style={styles.doctorName} numberOfLines={1}>
                    {doctor.full_name}
                </Text>
                <Text style={styles.doctorSpecialization} numberOfLines={1}>
                    {doctor.specialization}
                </Text>

                <View style={styles.timeRow}>
                    <Ionicons name="time-outline" size={13} color={colors.text} />
                    <Text style={styles.timeText}>{time}</Text>
                </View>

                <Text style={styles.doctorFee}>
                    Fee: ${Number(doctor.consultation_fee).toLocaleString()}
                </Text>
            </View>



            {/* Arrow button (bottom right) */}
            <View style={styles.arrowBtn}>
                <Ionicons
                    name="arrow-forward"
                    size={22}
                    color={colors.textOnPrimary}
                />
            </View>
        </MotiPressable>
    );
}