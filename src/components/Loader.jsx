import { Ionicons } from "@expo/vector-icons";
import { MotiText, MotiView } from "moti";

import colors from "../lib/colors";
import styles from "../styles/loader.style";

export default function Loader({ text, fullScreen = true }) {
    return (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "timing", duration: 250 }}
            style={[styles.container, fullScreen && styles.fullScreen]}
        >
            <MotiView style={styles.logoWrapper}>
                <MotiView
                    from={{ opacity: 0.7, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.5 }}
                    transition={{
                        type: "timing",
                        duration: 1300,
                        loop: true,
                    }}
                    style={styles.pulseRing}
                />

                <MotiView
                    from={{ scale: 0.95 }}
                    animate={{ scale: 1.05 }}
                    transition={{
                        type: "timing",
                        duration: 800,
                        loop: true,
                    }}
                    style={styles.iconCircle}
                >
                    <Ionicons
                        name="medkit-outline"
                        size={32}
                        color={colors.primary}
                    />
                </MotiView>
            </MotiView>


            {text ? <MotiText style={styles.text}>{text}</MotiText> : null}
        </MotiView>
    );
}