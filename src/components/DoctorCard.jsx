
import { Image, Pressable, Text, View } from "react-native";

import styles from "../styles/Cards.stlye";

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

