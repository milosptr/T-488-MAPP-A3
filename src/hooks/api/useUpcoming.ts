import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Trailer, UpcomingMovie, UpcomingQueryParams } from '@/src/types';

/**
 * Fetch upcoming movies, sorted by release date (ascending)
 *
 * @example
 * const { data: upcoming, isLoading } = useUpcoming();
 * const { data: filtered } = useUpcoming({ actor: 'Tom Hanks' });
 */
export const useUpcoming = (params?: UpcomingQueryParams) => {
    return useQuery({
        queryKey: queryKeys.upcoming.list(params),
        queryFn: async () => {
            const movies = await apiClient<UpcomingMovie[]>('/upcoming', {
                params: params as Record<string, string | number | undefined>,
            });
            // Sort by release date (ascending)
            return movies.sort((a, b) => {
                const dateA = new Date(a['release-dateIS']).getTime();
                const dateB = new Date(b['release-dateIS']).getTime();
                return dateA - dateB;
            });
        },
        staleTime: STALE_TIMES.upcoming,
    });
};

/**
 * Fetch a single upcoming movie by its MongoDB ID
 *
 * @example
 * const { data: movie } = useUpcomingMovie('507f1f77bcf86cd799439011');
 */
export const useUpcomingMovie = (id: string | undefined) => {
    return useQuery({
        queryKey: queryKeys.upcoming.detail(id ?? ''),
        queryFn: async () => {
            const movies = await apiClient<UpcomingMovie[]>('/upcoming', {
                params: { mongoid: id },
            });
            return movies[0] ?? null;
        },
        enabled: !!id,
        staleTime: STALE_TIMES.upcoming,
    });
};

/**
 * Fetch only upcoming movies that have trailers
 *
 * @example
 * const { data: moviesWithTrailers } = useUpcomingWithTrailers();
 */
export const useUpcomingWithTrailers = () => {
    return useQuery({
        queryKey: [...queryKeys.upcoming.all, 'with-trailers'] as const,
        queryFn: async () => {
            const movies = await apiClient<UpcomingMovie[]>('/upcoming');
            return movies
                .filter(
                    movie =>
                        movie.trailers &&
                        movie.trailers.length > 0 &&
                        movie.trailers.some((t: Trailer) => t.results.length > 0)
                )
                .sort((a, b) => {
                    const dateA = new Date(a['release-dateIS']).getTime();
                    const dateB = new Date(b['release-dateIS']).getTime();
                    return dateA - dateB;
                });
        },
        staleTime: STALE_TIMES.upcoming,
    });
};
