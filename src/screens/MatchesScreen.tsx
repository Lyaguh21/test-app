import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useGetMatchesData } from "../hooks/useGetMatchesData";
import { useFavorites } from "../hooks/useFavorites";
import MatchCard from "../components/MatchCard";
import MatchesFilters from "../components/MatchesFilters";
import type { MatchesFilter } from "../components/MatchesFilters";

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {
  const { matches, isLoading, isError, refetch, updatedAt } =
    useGetMatchesData();
  const [filter, setFilter] = useState<MatchesFilter>("all");
  const { isFavorite, toggle } = useFavorites();
  const filteredMatches = matches.filter(
    (match) => filter === "all" || match.status === filter,
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Матчи тура</Text>
        <MatchesFilters
          value={filter}
          onChange={setFilter}
          onRefresh={() => void refetch()}
          isLoading={isLoading}
          updatedAt={updatedAt}
        />
        {isLoading && <Text style={styles.info}>Загрузка...</Text>}
        {isError && <Text style={styles.info}>Ошибка: {isError}</Text>}

        {!isLoading &&
          !isError &&
          (filteredMatches.length > 0 ? (
            filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isFavorite={isFavorite(match.id)}
                onToggleFavorite={() => toggle(match.id)}
              />
            ))
          ) : (
            <Text style={styles.info}>Матчей нет</Text>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  info: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },
});
