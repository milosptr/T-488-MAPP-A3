import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Movie } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export const useMoviesByCinema = (cinemaId: number | undefined) => {
    return useQuery({
        queryKey: [...queryKeys.movies.all, 'by-cinema', cinemaId] as const,
        queryFn: async () => {
            const movies = await apiClient<Movie[]>('/movies');
            const cinemaMovies = movies.filter(movie =>
                movie.showtimes.some(st => st.cinema.id === cinemaId)
            );

            const seen = new Set<number>();
            return cinemaMovies.filter(movie => {
                if (seen.has(movie.id)) return false;
                seen.add(movie.id);
                return true;
            });
        },
        enabled: !!cinemaId,
        staleTime: STALE_TIMES.movies,
    });
};
