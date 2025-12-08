import type { MoviesQueryParams, UpcomingQueryParams } from '@/src/types';

/**
 * Query Key Factory
 *
 * Hierarchical structure enables granular cache invalidation:
 * - queryKeys.movies.all - invalidates all movie queries
 * - queryKeys.movies.list(params) - invalidates specific filtered list
 * - queryKeys.movies.detail(id) - invalidates specific movie
 */
export const queryKeys = {
    movies: {
        all: ['movies'] as const,
        lists: () => [...queryKeys.movies.all, 'list'] as const,
        list: (params?: MoviesQueryParams) => [...queryKeys.movies.lists(), params ?? {}] as const,
        details: () => [...queryKeys.movies.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.movies.details(), id] as const,
        byCinema: (cinemaId: number) => [...queryKeys.movies.all, 'cinema', cinemaId] as const,
    },

    upcoming: {
        all: ['upcoming'] as const,
        lists: () => [...queryKeys.upcoming.all, 'list'] as const,
        list: (params?: UpcomingQueryParams) =>
            [...queryKeys.upcoming.lists(), params ?? {}] as const,
        details: () => [...queryKeys.upcoming.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.upcoming.details(), id] as const,
    },

    cinemas: {
        all: ['cinemas'] as const,
        lists: () => [...queryKeys.cinemas.all, 'list'] as const,
        list: () => [...queryKeys.cinemas.lists()] as const,
        details: () => [...queryKeys.cinemas.all, 'detail'] as const,
        detail: (id: number) => [...queryKeys.cinemas.details(), id] as const,
    },

    genres: {
        all: ['genres'] as const,
        list: () => [...queryKeys.genres.all, 'list'] as const,
    },

    images: {
        all: ['images'] as const,
        byTmdbId: (tmdbId: number) => [...queryKeys.images.all, tmdbId] as const,
    },

    search: {
        all: ['search'] as const,
        query: (q: string) => [...queryKeys.search.all, q] as const,
    },

    auth: {
        all: ['auth'] as const,
        status: () => [...queryKeys.auth.all, 'status'] as const,
    },
} as const;

export type QueryKeys = typeof queryKeys;
export type MovieQueryKey = ReturnType<typeof queryKeys.movies.list>;
export type CinemaQueryKey = ReturnType<typeof queryKeys.cinemas.list>;
export type UpcomingQueryKey = ReturnType<typeof queryKeys.upcoming.list>;
