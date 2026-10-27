
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View
} from "react-native";


import DoctorCard from "../../components/DoctorCard";
import useAuth from "../../hooks/useAuth";
import { useDoctors } from "../../hooks/useDoctors";
import styles from "../../styles/homeScreen.style";

export default function HomeScreen() {
    const { user } = useAuth();

    const router = useRouter();
    const { doctors, loading, error, refreshDoctors } = useDoctors();

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.greeting}>
                    Hello {user?.full_name}
                </Text>
                <Text style={styles.subtitle}>
                    Discover trusted doctors and book your appointment.
                </Text>
                <Text style={styles.sectionTitle}>
                    Top doctors
                </Text>
            </View>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        onPress={() => router.push(`/doctor/${item.id}`)
                        }
                    />
                )}
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={loading && doctors.length > 0}
                        onRefresh={refreshDoctors}
                        tintColor="#0F766E"
                    />
                }

                ListEmptyComponent={
                    <View style={styles.empty}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#0F766E" />
                        ) : (
                            <Text style={styles.message}>
                                {error || "No active doctors found."}
                            </Text>
                        )}
                    </View>
                }
            />
        </>
    );
}

