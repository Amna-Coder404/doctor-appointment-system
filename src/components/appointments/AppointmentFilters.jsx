import { MotiText, MotiView } from "moti";
import { MotiPressable } from "moti/interactions";
import { useMemo } from "react";
import { ScrollView } from "react-native";

import colors from "../../lib/colors";
import styles from "../../styles/appointmentsScreen.style";

function FilterChip({ filter, count, active, onSelect }) {
    const animate = useMemo(
        () =>
            ({ pressed }) => {
                "worklet";
                return {
                    scale: pressed ? 0.96 : 1,
                    backgroundColor: active ? colors.primary : colors.surface,
                    borderColor: active ? colors.primary : colors.border,
                };
            },
        [active]
    );

    return (
        <MotiPressable
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            onPress={() => onSelect(filter.value)}
            animate={animate}
            transition={{ type: "timing", duration: 150 }}
            style={styles.filterButton}
        >
            <MotiText
                animate={{
                    color: active ? colors.textOnPrimary : colors.textSecondary,
                }}
                transition={{ type: "timing", duration: 150 }}
                style={styles.filterText}
            >
                {filter.label}
            </MotiText>

            <MotiView
                animate={{
                    backgroundColor: active
                        ? colors.primaryDark
                        : colors.inputBackground,
                }}
                transition={{ type: "timing", duration: 150 }}
                style={styles.filterCount}
            >
                <MotiText
                    animate={{
                        color: active ? colors.textOnPrimary : colors.text,
                    }}
                    transition={{ type: "timing", duration: 150 }}
                    style={styles.filterCountText}
                >
                    {count}
                </MotiText>
            </MotiView>
        </MotiPressable>
    );
}

export default function AppointmentFilters({ filters, counts, selected, onSelect, }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
        >
            {filters.map((filter) => (
                <FilterChip
                    key={filter.value}
                    filter={filter}
                    count={counts[filter.value] ?? 0}
                    active={selected === filter.value}
                    onSelect={onSelect}
                />
            ))}
        </ScrollView>
    );
}