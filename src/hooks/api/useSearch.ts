import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { SearchResponse, SearchResult } from '@/src/types';

/**
 * Search for movies by query string
 * Searches titles, alternative titles, actors, directors, and genres
 *
 * @example
 * const { data: results, isLoading } = useSearch('Batman');
 */
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

/**
 * Search with debounce support
 * Returns search results only when query hasn't changed for the debounce period
 *
 * Use this with a debounced query value:
 * @example
 * const [query, setQuery] = useState('');
 * const debouncedQuery = useDebounce(query, 300);
 * const { data } = useDebouncedSearch(debouncedQuery);
 */
export const useDebouncedSearch = (debouncedQuery: string | undefined) => {
    return useSearch(debouncedQuery);
};

/**
 * Get search results filtered by collection type
 *
 * @example
 * const { data } = useSearchByCollection('Batman', 'movies');
 */
export const useSearchByCollection = (
    query: string | undefined,
    collection: 'movies' | 'upcoming'
) => {
    const { data, ...rest } = useSearch(query);

    const filteredResults = data?.results.filter(
        (result: SearchResult) => result._collection === collection
    );

    return {
        ...rest,
        data: data
            ? {
                  ...data,
                  results: filteredResults ?? [],
                  returned: filteredResults?.length ?? 0,
              }
            : undefined,
    };
};
