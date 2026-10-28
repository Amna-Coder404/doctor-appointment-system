
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDoctors } from "../services/doctorService";

export function useDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const refreshDoctors = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getDoctors();
            setDoctors(data ?? []);
        } catch (err) {
            setError(err.message || "Failed to load doctors.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshDoctors();
    }, [refreshDoctors]);

    const filteredDoctors = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return doctors;
        }

        return doctors.filter((doctor) => {
            const name = doctor.full_name ?? "";
            const specialization = doctor.specialization ?? "";

            return (
                name.toLowerCase().includes(query) ||
                specialization.toLowerCase().includes(query)
            );
        });
    }, [doctors, searchQuery]);

    return {
        doctors,
        filteredDoctors,
        searchQuery,
        setSearchQuery,
        loading,
        error,
        refreshDoctors,
    };
}
