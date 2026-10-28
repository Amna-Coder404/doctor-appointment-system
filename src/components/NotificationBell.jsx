
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { Pressable, Text } from "react-native";

import useNotifications from "../hooks/useNotifications";
import colors from "../lib/colors";
import styles from "../styles/notificationBell.style";

export default function NotificationBell({ userId, role = "patient" }) {
    const router = useRouter();
    const { unreadCount } = useNotifications(userId, role);

    return (
        <Pressable
            onPress={() => router.push("/notifications")}
            accessibilityRole="button"
            accessibilityLabel={`Notifications, ${unreadCount} unread`}
            hitSlop={10}
            style={styles.container}
        >
            <MotiView
                from={{ scale: 0.9, rotate: "0deg" }}
                animate={{
                    scale: unreadCount > 0 ? 1.08 : 1,
                    rotate: unreadCount > 0 ? "-10deg" : "0deg",
                }}
                transition={{ type: "timing", duration: 250 }}
            >
                <Ionicons
                    name="notifications-outline"
                    size={25}
                    color={colors.text}
                />
            </MotiView>


            {unreadCount > 0 && (
                <MotiView
                    from={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    style={styles.badge}
                >
                    <Text style={styles.badgeText}>
                        {unreadCount > 99 ? "99+" : unreadCount}
                    </Text>
                </MotiView>
            )}

        </Pressable>
    );
}
