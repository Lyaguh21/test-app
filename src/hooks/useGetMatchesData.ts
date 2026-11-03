import { useCallback, useEffect, useRef, useState } from "react";

import { MATCHES_URL } from "../config";
import type { IMatch, MatchesResponse } from "../types/Matches";

export function useGetMatchesData() {
  const [matches, setMatches] = useState<IMatch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  const refetch = useCallback(async () => {
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;

    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(MATCHES_URL, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Не удалось загрузить матчи (HTTP ${response.status})`);
      }

      const data: MatchesResponse = await response.json();
      if (!Array.isArray(data?.matches)) {
        throw new Error("Сервер вернул некорректный список матчей");
      }

      if (!controller.signal.aborted) {
        setMatches(data.matches);
        setUpdatedAt(new Date());
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        setIsError(
          error instanceof Error ? error.message : "Не удалось загрузить матчи",
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false);
        requestRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    void refetch();

    return () => {
      requestRef.current?.abort();
    };
  }, [refetch]);

  return { matches, isLoading, isError, refetch, updatedAt };
}
