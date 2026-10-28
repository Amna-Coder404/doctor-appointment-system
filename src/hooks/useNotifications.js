
import { useCallback, useEffect, useId, useState } from "react";
import { supabase } from "../lib/supabase";

import {
    clearAllNotifications as clearAllNotificationsService,
    deleteNotification as deleteNotificationService,
    getNotifications,
    getUnreadNotificationCount,
    markAllNotificationsAsRead,
    markNotificationAsRead,
} from "../services/notificationService";

export default function useNotifications(userId, role = "patient") {
    const reactId = useId();
    const channelId = reactId.replace(/[^a-zA-Z0-9_-]/g, "");

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const refreshNotifications = useCallback(async (showLoader = false) => {
        if (!userId) {
            setNotifications([]);
            setUnreadCount(0);
            setLoading(false);
            return;
        }

        if (showLoader) setRefreshing(true);

        try {
            setError(null);

            const [items, count] = await Promise.all([
                getNotifications(userId, role),
                getUnreadNotificationCount(userId, role),
            ]);

            setNotifications(items);
            setUnreadCount(count);
        } catch (err) {
            setError(err.message || "Unable to load notifications.");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [userId, role]);

    useEffect(() => {
        let active = true;

        const load = async () => {
            if (!userId) {
                setNotifications([]);
                setUnreadCount(0);
                setLoading(false);
                return;
            }

            setLoading(true);

            try {
                const [items, count] = await Promise.all([
                    getNotifications(userId, role),
                    getUnreadNotificationCount(userId, role),
                ]);

                if (active) {
                    setNotifications(items);
                    setUnreadCount(count);
                    setError(null);
                }
            } catch (err) {
                if (active) {
                    setError(err.message || "Unable to load notifications.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        load();

        if (!userId) {
            return () => {
                active = false;
            };
        }

        // Register every callback BEFORE calling subscribe().
        const channel = supabase
            .channel(`notifications-${userId}-${role}-${channelId}`)
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "notifications",
                    filter: `recipient_id=eq.${userId}`,
                },
                () => {
                    if (active) refreshNotifications();
                }
            );

        channel.subscribe();

        return () => {
            active = false;
            supabase.removeChannel(channel);
        };
    }, [userId, role, channelId, refreshNotifications]);

    const markAsRead = async (notificationId) => {
        const item = notifications.find((n) => n.id === notificationId);

        if (!item || item.is_read) return;

        await markNotificationAsRead(notificationId);

        setNotifications((current) =>
            current.map((n) =>
                n.id === notificationId
                    ? { ...n, is_read: true, read_at: new Date().toISOString() }
                    : n
            )
        );

        setUnreadCount((count) => Math.max(0, count - 1));
    };

    const setNotificationReadState = async (notificationId, isRead) => {
        const item = notifications.find((n) => n.id === notificationId);

        if (!item || item.is_read === isRead) return;

        const readAt = isRead ? new Date().toISOString() : null;

        const { error } = await supabase
            .from("notifications")
            .update({ is_read: isRead, read_at: readAt })
            .eq("id", notificationId)
            .eq("recipient_id", userId)
            .eq("recipient_role", role);

        if (error) throw error;

        setNotifications((current) =>
            current.map((n) =>
                n.id === notificationId
                    ? { ...n, is_read: isRead, read_at: readAt }
                    : n
            )
        );

        setUnreadCount((count) =>
            Math.max(0, count + (isRead ? -1 : 1))
        );
    };


    const markAllAsRead = async () => {
        if (!userId) return;

        // Update the UI immediately — don't wait for Supabase
        const previousNotifications = notifications;
        const now = new Date().toISOString();

        setNotifications((previous) =>
            previous.map((item) => ({
                ...item,
                is_read: true,
                read_at: item.read_at || now,
            }))
        );

        setUnreadCount(0);

        try {
            await markAllNotificationsAsRead(userId, role);
        } catch (error) {
            console.error("Failed to mark all notifications as read:", error);

            // Restore state if the database update fails
            setNotifications(previousNotifications);
            await refreshNotifications();
        }
    };


    const removeNotification = async (notificationId) => {
        const item = notifications.find((n) => n.id === notificationId);
        if (!item) return;

        await deleteNotificationService(notificationId, userId, role);

        setNotifications((current) =>
            current.filter((n) => n.id !== notificationId)
        );

        if (!item.is_read) {
            setUnreadCount((count) => Math.max(0, count - 1));
        }
    };

    const clearAll = async () => {
        if (!userId) return;

        await clearAllNotificationsService(userId, role);
        setNotifications([]);
        setUnreadCount(0);
    };

    return {
        notifications,
        unreadCount,
        loading,
        refreshing,
        error,
        refreshNotifications,
        markAsRead,
        setNotificationReadState,
        markAllAsRead,
        removeNotification,
        clearAll,
    };
}
