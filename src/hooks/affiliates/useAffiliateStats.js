import { useQuery } from '@tanstack/react-query';
import { getAffiliateStatsApi } from '../../services/apiAffiliates';

export function useAffiliateStats(id, params = {}) {
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isErrorStats,
  } = useQuery({
    queryKey: ['affiliate-stats', id, params],
    queryFn: () => getAffiliateStatsApi(id, params),
    enabled: Boolean(id),
  });

  return { stats, isLoadingStats, isErrorStats };
}
