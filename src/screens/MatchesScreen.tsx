import { StyleSheet, Text, View } from "react-native";
import { useGetMatchesData } from "../hooks/useGetMatchesData";
import MatchCard from "../components/MatchCard";

// Экран «Матчи тура» — задание в README.md, часть 1.
export function MatchesScreen() {
  const { matches, isLoading, isError } = useGetMatchesData();

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Матчи тура</Text>
        {isLoading && <Text style={styles.info}>Загрузка...</Text>}
        {isError && <Text style={styles.info}>Ошибка: {isError}</Text>}

        {!isLoading &&
          !isError &&
          matches.map((match) => <MatchCard key={match.id} match={match} />)}
      </View>
    </>
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
