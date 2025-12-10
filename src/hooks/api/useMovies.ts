import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { Movie, MoviesQueryParams, Showtime } from '@/src/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

/**
 * Fetch all movies with optional filters
 *
 * @example
 * const { data: movies, isLoading } = useMovies();
 * const { data: filtered } = useMovies({ title: 'Batman' });
 */
export const useMovies = (params?: MoviesQueryParams) => {
    return useQuery({
        queryKey: queryKeys.movies.list(params),
        queryFn: () =>
            apiClient<Movie[]>('/movies', {
                params: params as Record<string, string | number | undefined>,
            }),
        staleTime: STALE_TIMES.movies,
        select: movies => {
            const seen = new Set<number>();
            return movies.filter(movie => {
                if (seen.has(movie.id)) return false;
                seen.add(movie.id);
                return true;
            });
        },
    });
};

const movieQueryOptions = (id: string | undefined) => ({
    queryKey: queryKeys.movies.detail(id ?? ''),
    queryFn: async () => {
        const movies = await apiClient<Movie[]>('/movies', {
            params: { mongoid: id },
        });
        return movies[0] ?? null;
    },
    enabled: !!id,
    staleTime: STALE_TIMES.movies,
});

/**
 * Fetch a single movie by its MongoDB ID
 *
 * @example
 * const { data: movie } = useMovie('507f1f77bcf86cd799439011');
 */
export const useMovie = (id: string | undefined) => {
    return useQuery(movieQueryOptions(id));
};

/**
 * Get showtimes for a movie at a specific cinema
 * Uses the same cache as useMovie, with select for derived data
 *
 * @example
 * const { data: showtimes, isLoading } = useMovieShowtimes('507f1f77bcf86cd799439011', 1);
 */
export const useMovieShowtimes = (movieId: string | undefined, cinemaId: string | undefined) => {
    const selectShowtimes = useCallback(
        (movie: Movie | null) =>
            movie?.showtimes.filter((st: Showtime) => String(st.cinema.id) === String(cinemaId)),
        [cinemaId]
    );

    return useQuery({
        ...movieQueryOptions(movieId),
        enabled: !!movieId && !!cinemaId,
        select: selectShowtimes,
    });
};

/**
 * Get movies grouped by cinema
 * Useful for the home screen display
 *
 * @example
 * const { data: grouped } = useMoviesGroupedByCinema();
 * // Returns: Map<cinemaId, { cinema: {...}, movies: [...] }>
 */
export const useMoviesGroupedByCinema = () => {
    return useQuery({
        queryKey: [...queryKeys.movies.all, 'grouped-by-cinema'] as const,
        queryFn: async () => {
            const movies = await apiClient<Movie[]>('/movies');

            const grouped = new Map<
                number,
                { cinema: { id: number; name: string }; movies: Movie[] }
            >();

            movies.forEach(movie => {
                movie.showtimes.forEach((showtime: Showtime) => {
                    const cinemaId = showtime.cinema.id;
                    if (!grouped.has(cinemaId)) {
                        grouped.set(cinemaId, {
                            cinema: showtime.cinema,
                            movies: [],
                        });
                    }
                    const group = grouped.get(cinemaId)!;
                    if (!group.movies.some(m => m._id === movie._id)) {
                        group.movies.push(movie);
                    }
                });
            });

            // Sort cinemas alphabetically
            return Array.from(grouped.values()).sort((a, b) =>
                a.cinema.name.localeCompare(b.cinema.name, 'is')
            );
        },
        staleTime: STALE_TIMES.movies,
    });
};
