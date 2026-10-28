import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { Image } from "react-native";

import styles from "../styles/homeScreen.style";

export default function DoctorCard({ doctor, onPress }) {
    return (
        <MotiPressable
            onPress={onPress}
            from={{ opacity: 0, translateY: 12 }}
            animate={({ pressed }) => {
                "worklet";
                return {
                    opacity: 1,
                    translateY: 0,
                    scale: pressed ? 0.98 : 1,
                };
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
                <MotiView
                    style={[styles.doctorImage, styles.doctorPlaceholder]}
                >
                    <MotiText style={styles.doctorInitial}>
                        {doctor.full_name?.charAt(0)?.toUpperCase() || "D"}
                    </MotiText>
                </MotiView>
            )}

            <MotiView style={styles.doctorDetails}>
                <MotiText style={styles.doctorName} numberOfLines={1}>
                    {doctor.full_name}
                </MotiText>

                <MotiText style={styles.doctorSpecialization} numberOfLines={1}>
                    {doctor.specialization}
                </MotiText>

                {!!doctor.qualification && (
                    <MotiText
                        style={styles.doctorQualification}
                        numberOfLines={1}
                    >
                        {doctor.qualification}
                    </MotiText>
                )}

                <MotiText style={styles.doctorExperience}>
                    {doctor.experience_years} years experience
                </MotiText>

                <MotiView style={styles.doctorFooter}>
                    <MotiText style={styles.doctorFee}>
                        Fee {Number(doctor.consultation_fee).toLocaleString()}
                    </MotiText>

                    <MotiText style={styles.doctorViewDetails}>
                        View details →
                    </MotiText>
                </MotiView>
            </MotiView>
        </MotiPressable>
    );
}