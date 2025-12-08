import { useAppSelector } from '@/src/store';
import { FiltersState } from '@/src/store/slices/filtersSlice';
import { Movie } from '@/src/types';
import { useMemo } from 'react';

const parseShowtime = (time: string): string | null => {
    const match = time.match(/^(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : null;
};

export const filterMovies = (movies: Movie[], filters: FiltersState): Movie[] => {
    return movies.filter(movie => {
        if (filters.title.trim()) {
            const searchTerm = filters.title.toLowerCase();
            if (!movie.title.toLowerCase().includes(searchTerm)) {
                return false;
            }
        }

        if (filters.cinemas.length > 0) {
            const movieCinemaIds = movie.showtimes?.map(s => s.cinema.id) ?? [];
            if (!filters.cinemas.some(cinemaId => movieCinemaIds.includes(cinemaId))) {
                return false;
            }
        }

        if (filters.rating && filters.rating.value !== 'ANY') {
            const imdbRating =
                typeof movie.ratings.imdb === 'string'
                    ? parseFloat(movie.ratings.imdb)
                    : movie.ratings.imdb;
            if (isNaN(imdbRating) || imdbRating < filters.rating.imdb) {
                return false;
            }
        }

        if (filters.certificate && movie.certificate?.is !== filters.certificate) {
            return false;
        }

        if (filters.actors.length > 0) {
            const movieActors = movie.actors_abridged.map(a => a.name);
            if (!filters.actors.some(actor => movieActors.includes(actor))) {
                return false;
            }
        }

        if (filters.directors.length > 0) {
            const movieDirectors = movie.directors_abridged.map(d => d.name);
            if (!filters.directors.some(dir => movieDirectors.includes(dir))) {
                return false;
            }
        }

        if (filters.showtime && filters.showtime.value !== 'ANY') {
            const hasMatchingShowtime = movie.showtimes?.some(showtime =>
                showtime.schedule.some(s => {
                    const time = parseShowtime(s.time);
                    if (!time) return false;
                    return time >= filters.showtime!.start && time <= filters.showtime!.end;
                })
            );
            if (!hasMatchingShowtime) return false;
        }

        return true;
    });
};

export const useFilteredMovies = (movies: Movie[]): Movie[] => {
    const filters = useAppSelector(state => state.filters);
    return useMemo(() => filterMovies(movies, filters), [movies, filters]);
};
