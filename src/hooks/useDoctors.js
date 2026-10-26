import { useCallback, useEffect, useState } from "react";
import { getDoctors } from "../services/doctorService";

export function useDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return { doctors, loading, error, refreshDoctors };
}