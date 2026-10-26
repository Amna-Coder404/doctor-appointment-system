
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";


import DoctorCard from "../../components/DoctorCard";
import { useDoctors } from "../../hooks/useDoctors";

export default function HomeScreen() {
    const router = useRouter();
    const { doctors, loading, error, refreshDoctors } = useDoctors();

    return (
        <>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DoctorCard
                        doctor={item}
                        onPress={() =>
                            router.push(`/doctor/${item.id}`)
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
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.greeting}>
                            Find your doctor
                        </Text>
                        <Text style={styles.subtitle}>
                            Discover trusted doctors and book your appointment.
                        </Text>
                        <Text style={styles.sectionTitle}>
                            Available doctors
                        </Text>
                    </View>
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

const styles = StyleSheet.create({
    content: {
        padding: 18,
        paddingBottom: 32,
        flexGrow: 1,
    },
    header: {
        marginBottom: 22,
    },
    greeting: {
        fontSize: 27,
        fontWeight: "800",
        color: "#172B2A",
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 21,
        marginTop: 7,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#172B2A",
        marginTop: 26,
    },
    empty: {
        paddingVertical: 36,
        alignItems: "center",
    },
    message: {
        color: "#6B7280",
        textAlign: "center",
    },
});
