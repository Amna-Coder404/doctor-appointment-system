import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";

import colors from "../lib/colors";
import styles from "../styles/notFound.style";

export default function NotFound({
    text,
    subtitle,
    actionLabel,
    icon = "search-outline",
}) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 300 }}
            style={styles.card}
        >
            <MotiView style={styles.iconCircle}>
                <Ionicons name={icon} size={34} color={colors.primary} />
            </MotiView>

            <MotiText style={styles.title}>{text}</MotiText>

            {subtitle ? (
                <MotiText style={styles.subtitle}>{subtitle}</MotiText>
            ) : null}
        </MotiView>
    );
}