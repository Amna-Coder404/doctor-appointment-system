import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { supabase } from "../lib/supabase";
import { getBookedAppointments } from "../services/appointmentsService";
import { getDoctorAvailability } from "../services/doctorService";
import { generateTimeSlots } from "../utils/utils";



function overlaps(startMs, endMs, appointment) {
    const existingStart = new Date(appointment.starts_at).getTime();
    const existingEnd = new Date(appointment.ends_at).getTime();
    return startMs < existingEnd && endMs > existingStart;
}

export default function useBooking({ id, doctor }) {
    const [selectedDate, setSelectedDate] = useState(() => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    });



    const [selectedTime, setSelectedTime] = useState(null);
    const [schedules, setSchedules] = useState([]);
    const [booked, setBooked] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [needsLogin, setNeedsLogin] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const dates = useMemo(
        () =>
            Array.from({ length: 14 }, (_, index) => {
                const date = new Date();
                date.setHours(0, 0, 0, 0);
                date.setDate(date.getDate() + index);
                return date;
            }),
        []
    );
    function closeLogin() {
        setNeedsLogin(false);
    }
    const loadAvailability = useCallback(async () => {
        if (!id) {
            setError("Doctor ID is missing. Please open the doctor again.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSelectedTime(null);

            const [scheduleData, bookedData] = await Promise.all([
                getDoctorAvailability(id),
                getBookedAppointments(id, selectedDate),
            ]);

            setSchedules(scheduleData);
            setBooked(bookedData);
        } catch (err) {
            setError(err?.message || "Unable to load available times.");
        } finally {
            setLoading(false);
        }
    }, [id, selectedDate]);

    useEffect(() => {
        loadAvailability();
    }, [loadAvailability]);

    const slots = useMemo(() => {
        const dayOfWeek = selectedDate.getDay();

        const allSlots = schedules
            .filter((schedule) => schedule.day_of_week === dayOfWeek)
            .flatMap((schedule) =>
                generateTimeSlots(schedule, selectedDate).map((slot) => ({
                    ...slot,
                    duration: schedule.slot_duration_minutes,
                }))
            );

        return allSlots.filter(
            (slot) =>
                !booked.some((appointment) =>
                    overlaps(
                        slot.startsAt.getTime(),
                        slot.endsAt.getTime(),
                        appointment
                    )
                )
        );
    }, [schedules, booked, selectedDate]);

    function selectDate(date) {
        setSelectedDate(date);
        setSelectedTime(null);
    }

    async function confirmBooking() {
        if (!doctor || !id || !selectedTime) {
            Alert.alert(
                "Select a time",
                "Please select an available appointment time."
            );
            return;
        }

        try {
            setSubmitting(true);


            setSubmitting(true);

            const {
                data: { session },
            } = await supabase.auth.getSession();
            const user = session?.user;


            if (!user) {
                setNeedsLogin(true);
                return;
            }
            // Recheck the slot right before inserting
            const latestBooked = await getBookedAppointments(id, selectedDate);
            const startMs = selectedTime.startsAt.getTime();
            const endMs = selectedTime.endsAt.getTime();

            if (latestBooked.some((a) => overlaps(startMs, endMs, a))) {
                setSelectedTime(null);
                await loadAvailability();
                Alert.alert(
                    "Time no longer available",
                    "Someone has booked this slot. Please choose another time."
                );
                return;
            }

            const { error: insertError } = await supabase
                .from("appointments")
                .insert({
                    patient_id: user.id,
                    doctor_id: id,
                    starts_at: selectedTime.startsAt.toISOString(),
                    ends_at: selectedTime.endsAt.toISOString(),
                    consultation_fee: Number(doctor.consultation_fee) || 0,
                    status: "pending",
                    payment_status: "unpaid",
                });

            if (insertError) throw insertError;

            setShowSuccess(true);
        } catch (err) {
            if (err?.code === "23P01") {
                Alert.alert(
                    "Time no longer available",
                    "This appointment overlaps with another booking. Please select a different time."
                );
            } else {
                Alert.alert(
                    "Booking failed",
                    err?.message || "Could not create your appointment."
                );
            }
        } finally {
            setSubmitting(false);
        }
    }

    return {
        // data
        dates,
        slots,
        selectedDate,
        selectedTime,
        // status
        loading,
        submitting,
        error,
        needsLogin,
        showSuccess,
        disabled: loading || submitting || !selectedTime || !!error,
        // actions
        selectDate,
        setSelectedTime,
        setShowSuccess,
        loadAvailability,
        confirmBooking,
        closeLogin
    };
}