
import {
    getCachedRecords,
    saveCachedRecords,
} from "../database/cacheRepository";
import { getDatabase } from "../database/getDatabase";
import { supabase } from "../lib/supabase";

const getNotificationScope = (userId, role) => `notifications:${userId}:${role}`;

export const getNotifications = async (
    userId,
    role = "patient"
) => {
    const db = await getDatabase();
    const scope = getNotificationScope(userId, role);

    try {
        const { data, error } = await supabase
            .from("notifications")
            .select("*")
            .eq("recipient_id", userId)
            .eq("recipient_role", role)
            .order("created_at", { ascending: false });

        if (error) throw error;

        const notifications = data ?? [];

        // Save notifications for offline access.
        // Clear old records first so deleted server records
        // don't remain in the local cache.
        await db.runAsync(
            "DELETE FROM local_cache WHERE cache_scope = ? AND record_type = ?",
            scope,
            "notification"
        );

        await saveCachedRecords(
            db,
            scope,
            "notification",
            notifications
        );

        return notifications;
    } catch (error) {
        // If the network request fails, use cached notifications.
        const cachedNotifications = await getCachedRecords(
            db,
            scope,
            "notification"
        );

        if (cachedNotifications.length > 0) {
            return cachedNotifications.sort(
                (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
            );
        }

        throw error;
    }
};

export const getUnreadNotificationCount = async (
    userId,
    role = "patient"
) => {
    const db = await getDatabase();
    const scope = getNotificationScope(userId, role);

    try {
        const { count, error } = await supabase
            .from("notifications")
            .select("id", { count: "exact", head: true })
            .eq("recipient_id", userId)
            .eq("recipient_role", role)
            .eq("is_read", false);

        if (error) throw error;

        return count ?? 0;
    } catch (error) {
        const cachedNotifications = await getCachedRecords(
            db,
            scope,
            "notification"
        );

        if (cachedNotifications.length > 0) {
            return cachedNotifications.filter(
                (notification) => !notification.is_read
            ).length;
        }

        throw error;
    }
};

export const markNotificationAsRead = async (
    notificationId
) => {
    const { error } = await supabase
        .from("notifications")
        .update({
            is_read: true,
            read_at: new Date().toISOString(),
        })
        .eq("id", notificationId)
        .eq("is_read", false);

    if (error) throw error;
};

export const markAllNotificationsAsRead = async (
    userId,
    role = "patient"
) => {
    const { error } = await supabase
        .from("notifications")
        .update({
            is_read: true,
            read_at: new Date().toISOString(),
        })
        .eq("recipient_id", userId)
        .eq("recipient_role", role)
        .eq("is_read", false);

    if (error) throw error;
};

export const deleteNotification = async (
    notificationId,
    userId,
    role = "patient"
) => {
    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("id", notificationId)
        .eq("recipient_id", userId)
        .eq("recipient_role", role);

    if (error) throw error;
};

export const clearAllNotifications = async (
    userId,
    role = "patient"
) => {
    const { error } = await supabase
        .from("notifications")
        .delete()
        .eq("recipient_id", userId)
        .eq("recipient_role", role);

    if (error) throw error;
};
