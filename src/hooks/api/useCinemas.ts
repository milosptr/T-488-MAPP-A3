import { useQuery } from '@tanstack/react-query';
import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Cinema } from '@/src/types';
import { useCallback } from 'react';

const fetchCinemas = async () => {
    const cinemas = await apiClient<Cinema[]>('/theaters');
    return cinemas.sort((a, b) => a.name.localeCompare(b.name, 'is'));
};

/**
 * Fetch all cinemas, sorted alphabetically
 *
 * @example
 * const { data: cinemas, isLoading } = useCinemas();
 */
export const useCinemas = () => {
    return useQuery({
        queryKey: queryKeys.cinemas.list(),
        queryFn: fetchCinemas,
        staleTime: STALE_TIMES.cinemas,
    });
};

/**
 * Fetch a single cinema by ID
 * Derives from the same cache as useCinemas()
 *
 * @example
 * const { data: cinema } = useCinema(1);
 */
export const useCinema = (id: number | undefined) => {
    const selectCinema = useCallback(
        (cinemas: Cinema[]) => cinemas.find(c => c.id === id) ?? null,
        [id]
    );

    return useQuery({
        queryKey: queryKeys.cinemas.list(),
        queryFn: fetchCinemas,
        enabled: !!id,
        staleTime: STALE_TIMES.cinemas,
        select: selectCinema,
    });
};
