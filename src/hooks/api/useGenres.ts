import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Genre } from '@/src/types';

/**
 * Fetch all genres
 * Long cache time since genres rarely change
 *
 * @example
 * const { data: genres } = useGenres();
 */
export const useGenres = () => {
    return useQuery({
        queryKey: queryKeys.genres.list(),
        queryFn: () => apiClient<Genre[]>('/genres'),
        staleTime: STALE_TIMES.genres,
    });
};

/**
 * Get a genre by ID
 *
 * @example
 * const genre = useGenreById(28); // Action
 */
export const useGenreById = (id: number | undefined) => {
    const { data: genres } = useGenres();
    return genres?.find(genre => genre.ID === id);
};

/**
 * Get genres as a lookup map for quick access
 *
 * @example
 * const { data: genreMap } = useGenresMap();
 * const actionGenre = genreMap?.get(28);
 */
export const useGenresMap = () => {
    return useQuery({
        queryKey: [...queryKeys.genres.all, 'map'] as const,
        queryFn: async () => {
            const genres = await apiClient<Genre[]>('/genres');
            return new Map(genres.map(genre => [genre.ID, genre]));
        },
        staleTime: STALE_TIMES.genres,
    });
};
