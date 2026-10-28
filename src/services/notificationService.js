
import { supabase } from "../lib/supabase";

export const getNotifications = async (userId, role = "patient") => {
    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", userId)
        .eq("recipient_role", role)
        .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
};

export const getUnreadNotificationCount = async (userId, role = "patient") => {
    const { count, error } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("recipient_id", userId)
        .eq("recipient_role", role)
        .eq("is_read", false);

    if (error) throw error;
    return count ?? 0;
};

export const markNotificationAsRead = async (notificationId) => {
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
