import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DoctorCard from "../../components/DoctorCard";
import DoctorSearch from "../../components/DoctorSearch";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import NotificationBell from "../../components/NotificationBell";
import useAuth from "../../hooks/useAuth";
import { useDoctors } from "../../hooks/useDoctors";
import { usePatientProfile } from "../../hooks/usePatientProfile";
import colors from "../../lib/colors";
import styles from "../../styles/homeScreen.style";
import { getImageSource } from "../../utils/utils";



export default function HomeScreen() {
    const { profile, reloadProfile } = usePatientProfile();
    const router = useRouter();
    const { user } = useAuth();
    const { doctors, loading, error, refreshDoctors } = useDoctors();
    const [searchQuery, setSearchQuery] = useState("");


    const filteredDoctors = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return doctors;

        return doctors.filter((doctor) => {
            const name = (doctor.full_name || "").toLowerCase();
            const specialization = (doctor.specialization || "").toLowerCase();
            return name.includes(query) || specialization.includes(query);
        });

    }, [doctors, searchQuery]);
    useFocusEffect(
        useCallback(() => {
            reloadProfile();
        }, [reloadProfile])
    );

    const avatarSource = getImageSource(profile?.avatar_url, profile?.updated_at);
    const Header = (
        <View style={styles.header}>
            <View style={styles.topRow}>
                {avatarSource ? (
                    <Image
                        source={avatarSource}
                        style={styles.avatar}
                        onError={(e) => console.log("Avatar error:", e.nativeEvent.error)}
                    />
                ) : (
                    <View style={[styles.avatar, styles.avatarPlaceholder]}>
                        <Ionicons
                            name="person"
                            size={26}
                            color={colors.textOnPrimary}
                        />
                    </View>
                )}
                <NotificationBell userId={user?.id} />
            </View>

            <Text style={styles.greeting}>
                <Text style={styles.greetingBold}>Hello </Text>
                {profile?.full_name || "there"} !
            </Text>

            <DoctorSearch value={searchQuery} onChangeText={setSearchQuery} />

            <Text style={styles.sectionTitle}>Top Doctors</Text>
        </View>
    );
    return (
        <SafeAreaView style={styles.screen} edges={["top"]}>
            <FlatList
                data={filteredDoctors}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        onPress={() => router.push(`/doctor/${item.id}`)}
                    />
                )}
                ListHeaderComponent={Header}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                refreshControl={
                    <RefreshControl
                        refreshing={loading && doctors.length > 0}
                        onRefresh={refreshDoctors}
                        tintColor={colors.primary}
                    />
                }
                ListEmptyComponent={
                    loading ? (
                        <Loader />
                    ) : error ? (
                        <NotFound
                            icon="alert-circle-outline"
                            text="Something went wrong"
                            subtitle={error}
                        />
                    ) : searchQuery.trim() ? (
                        <NotFound
                            icon="search-outline"
                            text="No matching doctors"
                            subtitle="Try another doctor name or specialization."
                        />
                    ) : (
                        <NotFound
                            icon="medkit-outline"
                            text="No active doctors found"
                            subtitle="Please check back later."
                        />
                    )
                }
            />
        </SafeAreaView>
    );
}