import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    View
} from "react-native";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import AppointmentFilters from "../../components/appointments/AppointmentFilters";
import Loader from "../../components/Loader";
import NotFound from "../../components/NotFound";
import { useMyAppointments } from "../../hooks/useMyAppointments";
import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";

import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";


export default function AppointmentsScreen() {
    const { user, loading: authLoading } = useAuth();


    const router = useRouter();

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
        // Multi-select delete
        selectedIds,
        selectionMode,
        toggleSelection,
        startSelection,
        exitSelection,
        deleteSelectedAppointments,
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
    const handleDeleteSelected = () => {
        if (selectedIds.length === 0) {
            Alert.alert("No appointments selected", "Please select appointments to delete.");
            return;
        }

        Alert.alert(
            "Delete appointments",
            `Are you sure you want to delete ${selectedIds.length} selected appointment(s)? This action cannot be undone.`,
            [
                {
                    text: "Keep",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const deletedIds = await deleteSelectedAppointments();

                            Alert.alert(
                                "Deleted",
                                `${deletedIds.length} appointment(s) deleted successfully.`
                            );
                        } catch (err) {
                            Alert.alert(
                                "Unable to delete",
                                err?.message || "Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };

    if (authLoading) return <Loader />
    if (!user) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <NotFound
                    icon="lock-closed-outline"
                    text="Please Sign In first"
                    subtitle="Sign in to view and manage your appointments."
                />
            </View>
        );
    }

    return (
        <>
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
                        selectionMode={selectionMode}
                        selected={selectedIds.includes(item.id)}
                        onLongPress={() => startSelection(item.id)}
                        onPress={() => {
                            if (selectionMode) {
                                toggleSelection(item.id);
                            }
                        }}
                    />
                )}
                ListHeaderComponent={
                    <MotiView style={styles.screenHeader}>

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
                                    color={colors.background}
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
                        {selectionMode && (
                            <MotiView
                                from={{ opacity: 0, translateY: -8 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                style={styles.selectionMode}
                            >
                                <MotiText style={{ color: colors.text }}>
                                    {selectedIds.length} selected
                                </MotiText>

                                <View style={styles.btnCon}>
                                    <MotiPressable onPress={exitSelection}>
                                        <MotiText style={{ color: colors.primary }}>
                                            Cancel
                                        </MotiText>
                                    </MotiPressable>

                                    <MotiPressable onPress={handleDeleteSelected}>
                                        <MotiText style={{ color: colors.danger, fontWeight: "700" }}>
                                            Delete selected
                                        </MotiText>
                                    </MotiPressable>
                                </View>
                            </MotiView>
                        )}
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
                                            {retrying ? "Retrying..." : "Try again"}
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
                            <ActivityIndicator size={"small"} />
                        </MotiView>
                    ) : hasMore ? (
                        <MotiView style={styles.footer}>
                            <ActivityIndicator size={"small"} />
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
        </>
    );
}