import { useQuery } from "@tanstack/react-query";
import { getSurprise } from "@/lib/surprise-api";
import type { SurpriseData } from "@/lib/types";

/**
 * Fetch a surprise by ID using TanStack Query.
 * Cached and stale-while-revalidate.
 */
export function useSurprise(id: string) {
  return useQuery<SurpriseData | null>({
    queryKey: ["surprise", id],
    queryFn: () => getSurprise(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
