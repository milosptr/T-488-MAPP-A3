import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { SearchResponse } from '@/src/types';

export const useSearch = (query: string | undefined) => {
    return useQuery({
        queryKey: queryKeys.search.query(query ?? ''),
        queryFn: () =>
            apiClient<SearchResponse>('/search', {
                params: { q: query },
            }),
        enabled: !!query && query.length >= 2,
        staleTime: STALE_TIMES.search,
    });
};
