import { useAppSelector } from '@/src/store';
import { CinemaGroup, filterMovies, groupMoviesByCinema } from '@/src/utils';
import { useDeferredValue, useMemo } from 'react';
import { useMovies } from './api/useMovies';

export type { CinemaGroup };

export const useFilteredMoviesGroupedByCinema = () => {
    const { data: movies = [], isLoading, isRefetching, refetch } = useMovies();
    const filters = useAppSelector(state => state.filters);
    const deferredFilters = useDeferredValue(filters);

    const filteredGroupedData = useMemo(() => {
        const grouped = groupMoviesByCinema(movies);
        return grouped
            .map(group => ({
                ...group,
                movies: filterMovies(group.movies, deferredFilters),
            }))
            .filter(group => group.movies.length > 0);
    }, [movies, deferredFilters]);

    return { data: filteredGroupedData, isLoading, isRefetching, refetch };
};
