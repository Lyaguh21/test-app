import { StyleSheet, Text, View } from "react-native";
import { MATCH_STATUS_TRANSLATE } from "../types/Matches";
import type { IMatch } from "../types/Matches";

export default function MatchCard({ match }: { match: IMatch }) {
  const isLive = match.status === "live";
  const startsAt = match.startsAt ? new Date(match.startsAt) : null;
  const dateLabel =
    startsAt && !Number.isNaN(startsAt.getTime())
      ? startsAt.toLocaleString("ru-RU", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Дата уточняется";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.badge, isLive && styles.liveBadge]}>
          <Text style={[styles.status, isLive && styles.liveText]}>
            {MATCH_STATUS_TRANSLATE[match.status] ?? match.status}
            {isLive && match.minute != null ? ` · ${match.minute}′` : ""}
          </Text>
        </View>
      </View>

      <View style={styles.teams}>
        <View style={styles.team}>
          <Text style={styles.role}>ХОЗЯЕВА</Text>
          <Text style={styles.teamName}>{match.home.name}</Text>
          <Text style={styles.city}>{match.home.city}</Text>
        </View>

        <View style={styles.scoreBlock}>
          <Text style={[styles.score, isLive && styles.liveText]}>
            {match.score ? `${match.score.home} : ${match.score.away}` : "—"}
          </Text>
        </View>

        <View style={[styles.team, styles.awayTeam]}>
          <Text style={styles.role}>ГОСТИ</Text>
          <Text style={[styles.teamName, styles.alignRight]}>
            {match.away.name}
          </Text>
          <Text style={[styles.city, styles.alignRight]}>
            {match.away.city}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{dateLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  header: { flexDirection: "row", marginBottom: 20 },
  badge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    flexShrink: 1,
  },
  liveBadge: { backgroundColor: "#fef2f2" },
  status: { fontSize: 12, fontWeight: "600", color: "#4b5563" },
  liveText: { color: "#dc2626" },
  teams: { flexDirection: "row", alignItems: "center", gap: 12 },
  team: { flex: 1, minWidth: 0, gap: 5 },
  awayTeam: { alignItems: "flex-end" },
  role: { fontSize: 10, fontWeight: "600", letterSpacing: 1, color: "#6b7280" },
  teamName: { fontSize: 16, fontWeight: "700", color: "#111827" },
  city: { fontSize: 12, color: "#6b7280" },
  alignRight: { textAlign: "right" },
  scoreBlock: { flexShrink: 0, alignItems: "center" },
  score: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    fontVariant: ["tabular-nums"],
  },
  footer: {
    marginTop: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  date: { fontSize: 12, color: "#6b7280", textAlign: "center" },
});
