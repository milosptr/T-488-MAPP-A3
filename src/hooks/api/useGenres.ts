import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Genre } from '@/src/types';

export const useGenres = () => {
    return useQuery({
        queryKey: queryKeys.genres.list(),
        queryFn: () => apiClient<Genre[]>('/genres'),
        staleTime: STALE_TIMES.genres,
    });
};
