import { useEffect } from 'react';

import { apiClient, getQueryClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Cinema, Movie } from '@/src/types';

export const usePrefetchAppData = () => {
    useEffect(() => {
        const prefetch = async () => {
            const queryClient = getQueryClient();

            await Promise.allSettled([
                queryClient.prefetchQuery({
                    queryKey: queryKeys.movies.list(),
                    queryFn: () => apiClient<Movie[]>('/movies'),
                    staleTime: STALE_TIMES.movies,
                }),
                queryClient.prefetchQuery({
                    queryKey: queryKeys.cinemas.list(),
                    queryFn: async () => {
                        const cinemas = await apiClient<Cinema[]>('/theaters');
                        return cinemas.sort((a, b) => a.name.localeCompare(b.name, 'is'));
                    },
                    staleTime: STALE_TIMES.cinemas,
                }),
            ]);
        };

        prefetch();
    }, []);
};
