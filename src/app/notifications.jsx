
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Alert,
    FlatList,
    Pressable,
    RefreshControl,
    Text,
    View
} from "react-native";

import { useEffect } from "react";
import Loader from "../components/Loader";
import NotFound from "../components/NotFound";
import NotificationCard from "../components/NotificationCard";
import useAuth from "../hooks/useAuth";
import useNetworkStatus from "../hooks/useNetworkStatus";
import useNotifications from "../hooks/useNotifications";
import colors from "../lib/colors";
import styles from "../styles/notificationsScreen.style";
import { formatDate } from "../utils/utils";


export default function NotificationsScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const { isOnline } = useNetworkStatus();
    const {
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
    } = useNotifications(user?.id, "patient");



    useEffect(() => {
        if (user?.id && unreadCount > 0) {
            markAllAsRead();
        }
    }, [user?.id]);


    const handleDelete = (item) => {
        if (!isOnline) {
            Alert.alert(
                "No Internet Connection",
                "You cannot delete notifications while offline. Please turn on Wi-Fi or mobile data and try again."
            );
            return;
        }

        Alert.alert(
            "Delete notification",
            "This notification will be permanently deleted.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await removeNotification(item.id);
                        } catch (err) {
                            Alert.alert(
                                "Delete failed",
                                err.message || "Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };

    const handleLongPress = (item) => {
        Alert.alert("Notification options", item.title, [
            {
                text: item.is_read ? "Mark as unread" : "Mark as read",
                onPress: async () => {
                    if (!isOnline) {
                        Alert.alert(
                            "No Internet Connection",
                            "You cannot mark notifications as read or unread while offline. Please turn on Wi-Fi or mobile data and try again."
                        );
                        return;
                    }

                    try {
                        await setNotificationReadState(
                            item.id,
                            !item.is_read
                        );
                    } catch (err) {
                        Alert.alert(
                            "Unable to update",
                            err.message || "Please try again."
                        );
                    }
                },
            },
            {
                text: "Delete notification",
                style: "destructive",
                onPress: () => handleDelete(item),
            },
            {
                text: "Cancel",
                style: "cancel",
            },
        ]);
    };

    const handleClearAll = () => {
        if (!notifications.length) return;

        if (!isOnline) {
            Alert.alert(
                "No Internet Connection",
                "You cannot delete notifications while offline. Please turn on Wi-Fi or mobile data and try again."
            );
            return;
        }

        Alert.alert(
            "Clear all notifications?",
            `Delete all ${notifications.length} notifications permanently?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear all",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await clearAll();
                        } catch (err) {
                            Alert.alert(
                                "Unable to clear notifications",
                                err.message || "Please try again."
                            );
                        }
                    },
                },
            ]
        );
    };
    const handlePress = async (item) => {
        if (item.is_read) return;

        try {
            await markAsRead(item.id);
        } catch (err) {
            Alert.alert(
                "Unable to update",
                err.message || "Please try again."
            );
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Pressable
                    onPress={() => router.back()}
                    hitSlop={10}
                    style={styles.backButton}
                >
                    <Ionicons name="chevron-back" size={26} color={colors.text} />
                </Pressable>

                <View style={styles.headerContent}>
                    <Text style={styles.title}>Notifications</Text>
                    <Text style={styles.subtitle}>
                        {unreadCount
                            ? `${unreadCount} unread`
                            : "You're all caught up"}
                    </Text>
                </View>

                {notifications.length > 0 && (
                    <Pressable
                        onPress={handleClearAll}
                        style={styles.clearButton}
                    >
                        <Text style={styles.clearButtonText}>
                            Clear all
                        </Text>
                    </Pressable>
                )}
            </View>

            {loading ? (
                <Loader />
            ) : error && notifications.length === 0 ? (
                <View style={styles.centered}>
                    <Ionicons
                        name="alert-circle-outline"
                        size={42}
                        color={colors.danger}
                    />
                    <Text style={styles.errorText}>{error}</Text>

                    <Pressable
                        onPress={() => refreshNotifications(true)}
                        style={styles.retryButton}
                    >
                        <Text style={styles.retryText}>Try again</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => refreshNotifications(true)}
                            tintColor={colors.primary}
                        />
                    }
                    ListHeaderComponent={
                        unreadCount > 0 && notifications.length > 0 ? (
                            <Pressable
                                style={styles.markAllButton}
                                onPress={async () => {
                                    try {
                                        await markAllAsRead();
                                    } catch (err) {
                                        Alert.alert(
                                            "Unable to update",
                                            err.message || "Please try again."
                                        );
                                    }
                                }}
                            >
                                <Text style={styles.markAllText}>
                                    Mark all as read
                                </Text>
                            </Pressable>
                        ) : null
                    }

                    ListEmptyComponent={
                        <NotFound
                            text="All clear!"
                            subtitle="You don't have any notifications. Appointment updates will appear here."
                            icon="notifications-off-outline"
                        />
                    }

                    renderItem={({ item, index }) => (
                        <NotificationCard
                            item={item}
                            index={index}
                            onPress={handlePress}
                            onLongPress={handleLongPress}
                            formatDate={formatDate}
                        />
                    )}

                />
            )}
        </View>
    );
}
