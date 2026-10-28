import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
} from "react-native";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import AppointmentFilters from "../../components/appointments/AppointmentFilters";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import SafeAreaWrapper from "../../components/SafeAreaWrapper";
import { useMyAppointments } from "../../hooks/useMyAppointments";
import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";


export default function AppointmentsScreen() {
    const {
        appointments,
        filteredAppointments,
        visibleAppointments,
        loading,
        loadingMore,
        refreshing,
        error,
        statusFilter,
        statusFilters,
        statusCounts,
        hasMore,
        loadMore,
        selectStatusFilter,
        fetchAppointments,
        cancelAppointment,
    } = useMyAppointments();

    const [retrying, setRetrying] = useState(false);


    const handleRefresh = () => {
        fetchAppointments(true);
    };

    const handleRetry = async () => {
        setRetrying(true);

        try {
            await fetchAppointments();
        } finally {
            setRetrying(false);
        }
    };

    const handleCancel = (appointmentId) => {
        Alert.alert(
            "Cancel appointment",
            "Are you sure you want to cancel this appointment?",
            [
                {
                    text: "Keep appointment",
                    style: "cancel",
                },
                {
                    text: "Cancel appointment",
                    style: "destructive",
                    onPress: async () => {
                        const success =
                            await cancelAppointment(appointmentId);

                        if (success) {
                            Alert.alert(
                                "Appointment cancelled",
                                "Your appointment has been cancelled successfully."
                            );
                        }
                    },
                },
            ]
        );
    };


    if (loading) return <Loader />

    return (
        <SafeAreaWrapper>
            <FlatList
                style={styles.list}
                contentContainerStyle={[
                    styles.listContent,
                    visibleAppointments.length === 0 &&
                    styles.emptyListContent,
                ]}
                data={visibleAppointments}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <AppointmentCard
                        appointment={item}
                        onCancel={handleCancel}

                    />
                )}
                ListHeaderComponent={
                    <MotiView style={styles.screenHeader}>
                        <MotiText style={styles.title}>
                            My Appointments
                        </MotiText>

                        <MotiText style={styles.subtitle}>
                            Manage your upcoming and previous visits.
                        </MotiText>

                        <MotiView
                            from={{ opacity: 0, translateY: 10 }}
                            animate={{ opacity: 1, translateY: 0 }}
                            transition={{ type: "timing", duration: 300 }}
                            style={styles.summary}
                        >
                            <MotiView style={styles.summaryIcon}>
                                <Ionicons
                                    name="calendar"
                                    size={23}
                                    color={colors.primary}
                                />
                            </MotiView>

                            <MotiView>
                                <MotiText style={styles.summaryNumber}>
                                    {appointments.length}
                                </MotiText>
                                <MotiText style={styles.summaryLabel}>
                                    Total appointments
                                </MotiText>
                            </MotiView>
                        </MotiView>

                        <AppointmentFilters
                            filters={statusFilters}
                            counts={statusCounts}
                            selected={statusFilter}
                            onSelect={selectStatusFilter}
                        />

                        {error ? (
                            <MotiView
                                from={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ type: "timing", duration: 250 }}
                                style={styles.errorBox}
                            >
                                <Ionicons
                                    name="alert-circle-outline"
                                    size={21}
                                    color={colors.danger}
                                />

                                <MotiView style={styles.errorContent}>
                                    <MotiText style={styles.errorTitle}>
                                        Unable to complete request
                                    </MotiText>

                                    <MotiText style={styles.errorText}>
                                        {error}
                                    </MotiText>

                                    <MotiPressable
                                        onPress={handleRetry}
                                        disabled={retrying}
                                        animate={({ pressed }) => {
                                            "worklet";
                                            return {
                                                opacity: pressed ? 0.6 : 1,
                                            };
                                        }}
                                        transition={{ type: "timing", duration: 120 }}
                                        style={styles.retryButton}
                                    >
                                        <MotiText style={styles.retryText}>
                                            {retrying
                                                ? "Retrying..."
                                                : "Try again"}
                                        </MotiText>
                                    </MotiPressable>
                                </MotiView>
                            </MotiView>
                        ) : null}
                    </MotiView>
                }
                ListEmptyComponent={
                    error ? null : statusFilter !== "all" &&
                        filteredAppointments.length === 0 ? (
                        <NotFound
                            icon="funnel-outline"
                            text={`No ${statusFilter} appointments`}
                            subtitle="Try another filter to see your appointments."
                        />
                    ) : (
                        <NotFound
                            icon="calendar-outline"
                            text="No appointments yet"
                            subtitle="Your booked appointments will appear here."
                        />
                    )
                }
                ListFooterComponent={
                    loadingMore ? (
                        <MotiView style={styles.footer}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                            <MotiText style={styles.mutedText}>
                                Loading more appointments...
                            </MotiText>
                        </MotiView>
                    ) : hasMore ? (
                        <MotiView style={styles.footer}>
                            <MotiText style={styles.mutedText}>
                                Scroll to see more appointments
                            </MotiText>
                        </MotiView>
                    ) : null
                }
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={colors.primary}
                        colors={[colors.primary]}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaWrapper>
    );
}