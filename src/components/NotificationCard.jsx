
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Pressable, Text, View } from "react-native";

import colors from "../lib/colors";
import styles from "../styles/notificationBell.style";

export default function NotificationCard({ item, index = 0, onPress, onLongPress, formatDate,
}) {
    const isRead = item.is_read;

    return (
        <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                type: "timing",
                duration: 220,
                delay: Math.min(index * 35, 250),
            }}
        >
            <Pressable
                onPress={() => onPress?.(item)}
                onLongPress={() => onLongPress?.(item)}
                delayLongPress={450}
                accessibilityRole="button"
                accessibilityHint="Long press for notification options"
                style={[
                    styles.card,
                    isRead ? styles.readCard : styles.unreadCard,
                ]}
            >
                <View
                    style={[
                        styles.iconContainer,
                        isRead ? styles.readIcon : styles.unreadIcon,
                    ]}
                >
                    <Ionicons
                        name={isRead
                            ? "notifications-outline"
                            : "notifications"
                        }
                        size={22}
                        color={colors.primary}
                    />
                </View>

                <View style={styles.cardContent}>
                    <View style={styles.titleRow}>
                        <Text
                            style={[
                                styles.notificationTitle,
                                isRead
                                    ? styles.readTitle
                                    : styles.unreadTitle,
                            ]}
                        >
                            {item.title}
                        </Text>

                        {!isRead && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={styles.message}>{item.message}</Text>

                    <View style={styles.footer}>
                        <Text style={styles.date}>
                            {formatDate(item.created_at)}
                        </Text>

                    </View>
                </View>
            </Pressable>
        </MotiView>
    );
}
