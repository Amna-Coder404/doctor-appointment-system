
import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import {
    cancelMyAppointment,
    deleteMyAppointments,
    getMyAppointments
} from "../services/appointmentsService";
import useNetworkStatus from "./useNetworkStatus";


const PAGE_SIZE = 2;

const STATUS_FILTERS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
];

export const useMyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [statusFilter, setStatusFilter] = useState("all");

    const [selectedIds, setSelectedIds] = useState([]);
    const [selectionMode, setSelectionMode] = useState(false);


    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");


    // for check internet
    const { isOnline } = useNetworkStatus();

    const fetchAppointments = useCallback(
        async (isRefreshing = false) => {
            if (isRefreshing) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            try {
                const data = await getMyAppointments();

                setAppointments(data);
                setVisibleCount(PAGE_SIZE);
            } catch (err) {
                setError(
                    err?.message || "Unable to load your appointments."
                );
            } finally {
                setLoading(false);
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const filteredAppointments = useMemo(() => {
        if (statusFilter === "all") {
            return appointments;
        }

        return appointments.filter(
            (appointment) => appointment.status === statusFilter
        );
    }, [appointments, statusFilter]);

    const visibleAppointments = useMemo(
        () => filteredAppointments.slice(0, visibleCount),
        [filteredAppointments, visibleCount]
    );

    const hasMore = visibleCount < filteredAppointments.length;

    const loadMore = useCallback(() => {
        if (loading || refreshing || loadingMore || !hasMore) {
            return;
        }

        setLoadingMore(true);

        setVisibleCount((current) =>
            Math.min(current + PAGE_SIZE, filteredAppointments.length)
        );

        setLoadingMore(false);
    }, [
        loading,
        refreshing,
        loadingMore,
        hasMore,
        filteredAppointments.length,
    ]);

    const selectStatusFilter = useCallback((status) => {
        setStatusFilter(status);
        setVisibleCount(PAGE_SIZE);
    }, []);

    const statusCounts = useMemo(() => {
        const counts = {
            all: appointments.length,
            pending: 0,
            confirmed: 0,
            completed: 0,
            cancelled: 0,
        };

        appointments.forEach((appointment) => {
            if (Object.hasOwn(counts, appointment.status)) {
                counts[appointment.status] += 1;
            }
        });

        return counts;
    }, [appointments]);

    const cancelAppointment = async (appointmentId) => {
        if (!isOnline) {
            Alert.alert(
                "No Internet Connection",
                "You cannot cancel an appointment while offline. Please turn on Wi-Fi or mobile data and try again."
            );

            return false;
        }

        setError("");

        try {
            await cancelMyAppointment(appointmentId);

            setAppointments((current) =>
                current.map((appointment) =>
                    appointment.id === appointmentId
                        ? { ...appointment, status: "cancelled" }
                        : appointment
                )
            );

            return true;
        } catch (err) {
            setError(
                err?.message || "Unable to cancel this appointment."
            );

            return false;
        }
    };

    // Delete selected appointment 

    const toggleSelection = (appointmentId) => {
        setSelectedIds((previous) => {
            const exists = previous.includes(appointmentId);

            const next = exists
                ? previous.filter((id) => id !== appointmentId)
                : [...previous, appointmentId];

            if (next.length === 0) {
                setSelectionMode(false);
            }

            return next;
        });
    };

    const startSelection = (appointmentId) => {
        setSelectionMode(true);

        setSelectedIds((previous) =>
            previous.includes(appointmentId)
                ? previous
                : [...previous, appointmentId]
        );
    };

    const exitSelection = () => {
        setSelectionMode(false);
        setSelectedIds([]);
    };

    const deleteSelectedAppointments = async () => {
        if (selectedIds.length === 0) {
            throw new Error("Please select at least one appointment.");
        }

        const deletedIds = await deleteMyAppointments(selectedIds);

        setSelectedIds((previous) =>
            previous.filter((id) => !deletedIds.includes(id))
        );

        setSelectionMode(false);

        await fetchAppointments(true);

        return deletedIds;
    };
    return {
        appointments,
        filteredAppointments,
        visibleAppointments,

        loading,
        loadingMore,
        refreshing,
        error,

        statusFilter,
        statusFilters: STATUS_FILTERS,
        statusCounts,

        hasMore,
        loadMore,
        selectStatusFilter,

        fetchAppointments,
        cancelAppointment,

        // Delete funcs
        selectedIds,
        selectionMode,
        toggleSelection,
        startSelection,
        exitSelection,
        deleteSelectedAppointments,
    };
};
