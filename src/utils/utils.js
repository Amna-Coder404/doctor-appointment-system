
export const toLocalDateTime = (date, time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const result = new Date(date);

    result.setHours(hours, minutes, 0, 0);

    return result;
};

export const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();

    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
};
export const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};
export function generateTimeSlots(schedule, date) {
    const slots = [];

    const [startHour, startMinute] = schedule.start_time
        .split(":")
        .map(Number);

    const [endHour, endMinute] = schedule.end_time
        .split(":")
        .map(Number);

    let current = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;
    const duration = schedule.slot_duration_minutes;

    while (current + duration <= end) {
        const hours = Math.floor(current / 60);
        const minutes = current % 60;

        const time = `${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}:00`;

        const startsAt = toLocalDateTime(date, time);

        if (startsAt > new Date()) {
            const endsAt = new Date(
                startsAt.getTime() + duration * 60_000
            );

            slots.push({
                time,
                label: formatTime(time),
                startsAt,
                endsAt,
            });
        }

        current += duration;
    }

    return slots;
}

export function getDateKey(date) {
    return `${date.getFullYear()}-${String(
        date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function getLocalTimestamp(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    ).getTime();
}

export const formatAppointmentDate = (value) => {
    if (!value) return "Date unavailable";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Date unavailable";
    }

    return date.toLocaleString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

export const formatMoney = (amount) => {
    if (amount === null || amount === undefined || amount === "") {
        return "Not available";
    }

    const value = Number(amount);

    if (!Number.isFinite(value)) return "Not available";

    return `PKR ${value.toLocaleString("en-PK")}`;
};
