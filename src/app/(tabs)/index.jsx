import { useRouter } from "expo-router";
import {
    FlatList,
    RefreshControl,
    Text,
    View
} from "react-native";

import DoctorCard from "../../components/DoctorCard";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import NotificationBell from "../../components/NotificationBell";
import useAuth from "../../hooks/useAuth";
import { useDoctors } from "../../hooks/useDoctors";
import colors from "../../lib/colors";
import styles from "../../styles/homeScreen.style";

export default function HomeScreen() {
    const { user } = useAuth();

    const router = useRouter();
    const { doctors, loading, error, refreshDoctors } = useDoctors();

    return (
        <>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.greeting}>
                        Hello {user?.full_name || "there"}
                    </Text>

                    <Text style={styles.subtitle}>
                        Discover trusted doctors and book your appointment.
                    </Text>
                </View>

                <NotificationBell userId={user?.id} />
            </View>
            <FlatList
                data={doctors}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        onPress={() => router.push(`/doctor/${item.id}`)}
                    />
                )}
                contentContainerStyle={styles.content}
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
                    ) : (
                        <NotFound
                            icon="medkit-outline"
                            text="No active doctors found"
                            subtitle="Please check back later."
                        />
                    )
                }
            />
        </>
    );
}