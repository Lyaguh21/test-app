export interface MatchesResponse {
  round: number;
  matches: IMatch[];
}

export interface IMatch {
  id: string;
  startsAt: string | null;
  status: IMatchStatus;
  home: IMatchPlayer;
  away: IMatchPlayer;
  score: {
    home: number;
    away: number;
  } | null;
  minute?: number;
}

export type IMatchStatus = "live" | "scheduled" | "finished" | "postponed";

export const MATCH_STATUS_TRANSLATE: Record<IMatchStatus, string> = {
  live: "В прямом эфире",
  scheduled: "Запланирован",
  finished: "Завершен",
  postponed: "Отложен",
};

export interface IMatchPlayer {
  id: string;
  name: string;
  city: string;
}
