import { Pressable, StyleSheet, Text, View } from "react-native";
import { UpdatedAgo } from "./UpdatedAgo";

export type MatchesFilter = "all" | "scheduled" | "finished";

const filters: { value: MatchesFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "scheduled", label: "Предстоящие" },
  { value: "finished", label: "Завершённые" },
];

type Props = {
  value: MatchesFilter;
  onChange: (value: MatchesFilter) => void;
  onRefresh: () => void;
  isLoading: boolean;
  updatedAt: Date | null;
};

export default function MatchesFilters({
  value,
  onChange,
  onRefresh,
  isLoading,
  updatedAt,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {filters.map((filter) => (
          <Pressable
            key={filter.value}
            accessibilityRole="button"
            accessibilityState={{ selected: value === filter.value }}
            onPress={() => onChange(filter.value)}
            style={({ pressed }) => [
              styles.button,
              value === filter.value && styles.selected,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.label,
                value === filter.value && styles.selectedLabel,
              ]}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.refresh}>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: isLoading }}
          disabled={isLoading}
          onPress={onRefresh}
          style={({ pressed }) => [
            styles.button,
            styles.refreshButton,
            isLoading && styles.pressed,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.label}>
            {isLoading ? "Обновление…" : "Обновить"}
          </Text>
        </Pressable>
        {updatedAt && <UpdatedAgo since={updatedAt} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 20,
  },
  filters: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  button: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
  },
  selected: { backgroundColor: "#111827" },
  label: { fontSize: 13, fontWeight: "600", color: "#374151" },
  selectedLabel: { color: "#ffffff" },
  refresh: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    marginLeft: "auto",
  },
  refreshButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  pressed: { opacity: 0.6 },
});
