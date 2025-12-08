import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Cinema } from '@/src/types';

/**
 * Fetch all cinemas, sorted alphabetically
 *
 * @example
 * const { data: cinemas, isLoading } = useCinemas();
 */
export const useCinemas = () => {
    return useQuery({
        queryKey: queryKeys.cinemas.list(),
        queryFn: async () => {
            const cinemas = await apiClient<Cinema[]>('/theaters');
            // Sort alphabetically by name (Icelandic locale)
            return cinemas.sort((a, b) => a.name.localeCompare(b.name, 'is'));
        },
        staleTime: STALE_TIMES.cinemas,
    });
};

/**
 * Fetch a single cinema by ID
 *
 * @example
 * const { data: cinema } = useCinema(1);
 */
export const useCinema = (id: number | undefined) => {
    return useQuery({
        queryKey: queryKeys.cinemas.detail(id ?? 0),
        queryFn: async () => {
            const cinemas = await apiClient<Cinema[]>('/theaters');
            return cinemas.find(cinema => cinema.id === id) ?? null;
        },
        enabled: !!id,
        staleTime: STALE_TIMES.cinemas,
    });
};
