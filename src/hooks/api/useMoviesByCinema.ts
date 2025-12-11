import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Movie } from '@/src/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useMoviesByCinema = (cinemaId: number | undefined) => {
    const selectMoviesByCinema = useCallback(
        (movies: Movie[]) => {
            const seen = new Set<number>();
            return movies
                .filter(movie => movie.showtimes.some(st => st.cinema.id === cinemaId))
                .filter(movie => {
                    if (seen.has(movie.id)) return false;
                    seen.add(movie.id);
                    return true;
                });
        },
        [cinemaId]
    );

    return useQuery({
        queryKey: queryKeys.movies.list(),
        queryFn: () => apiClient<Movie[]>('/movies'),
        enabled: !!cinemaId,
        staleTime: STALE_TIMES.movies,
        select: selectMoviesByCinema,
    });
};
