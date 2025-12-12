import { useMovies } from '@/src/hooks/api';
import type { Movie } from '@/src/types';
import { useMemo } from 'react';

type SharedFavouritesResult = {
    movies: Movie[];
    isLoading: boolean;
    error: string | null;
    invalidIds: string[];
};

const MONGODB_ID_REGEX = /^[a-f\d]{24}$/i;

const parseIds = (idsParam: string | undefined): { validIds: string[]; malformedIds: string[] } => {
    if (!idsParam || typeof idsParam !== 'string') {
        return { validIds: [], malformedIds: [] };
    }

    const trimmed = idsParam.trim();
    if (!trimmed) {
        return { validIds: [], malformedIds: [] };
    }

    const allIds = trimmed
        .split(',')
        .map(id => id.trim())
        .filter(Boolean);
    const validIds: string[] = [];
    const malformedIds: string[] = [];

    for (const id of allIds) {
        if (MONGODB_ID_REGEX.test(id)) {
            validIds.push(id);
        } else {
            malformedIds.push(id);
        }
    }

    return { validIds, malformedIds };
};

export const useSharedFavourites = (idsParam: string | undefined): SharedFavouritesResult => {
    const { validIds, malformedIds } = useMemo(() => parseIds(idsParam), [idsParam]);

    const { data: allMovies = [], isLoading, isError } = useMovies();

    const result = useMemo(() => {
        if (isLoading) {
            return {
                movies: [],
                isLoading: true,
                error: null,
                invalidIds: [],
            };
        }

        if (!idsParam) {
            return {
                movies: [],
                isLoading: false,
                error: 'No movie IDs provided in link',
                invalidIds: [],
            };
        }

        if (validIds.length === 0 && malformedIds.length > 0) {
            return {
                movies: [],
                isLoading: false,
                error: 'Invalid link format',
                invalidIds: malformedIds,
            };
        }

        if (isError) {
            return {
                movies: [],
                isLoading: false,
                error: 'Failed to load movies. Please try again.',
                invalidIds: malformedIds,
            };
        }

        const foundMovies: Movie[] = [];
        const notFoundIds: string[] = [...malformedIds];

        for (const id of validIds) {
            const movie = allMovies.find(m => m._id === id);
            if (movie) {
                foundMovies.push(movie);
            } else {
                notFoundIds.push(id);
            }
        }

        return {
            movies: foundMovies,
            isLoading: false,
            error: foundMovies.length === 0 ? 'No valid movies found in this link' : null,
            invalidIds: notFoundIds,
        };
    }, [allMovies, isLoading, isError, idsParam, validIds, malformedIds]);

    return result;
};
