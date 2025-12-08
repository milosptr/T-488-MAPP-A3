import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './client';

export const STALE_TIMES = {
    movies: 5 * 60 * 1000,
    upcoming: 10 * 60 * 1000,
    cinemas: 60 * 60 * 1000,
    genres: 24 * 60 * 60 * 1000,
    images: 60 * 60 * 1000,
    search: 2 * 60 * 1000,
} as const;

export const GC_TIMES = {
    default: 10 * 60 * 1000,
    static: 60 * 60 * 1000,
} as const;

const shouldRetry = (failureCount: number, error: unknown): boolean => {
    if (error instanceof ApiError && error.status === 401) {
        return false;
    }
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
        return false;
    }
    return failureCount < 3;
};

export const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: STALE_TIMES.movies,
                gcTime: GC_TIMES.default,
                retry: shouldRetry,
                retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
                refetchOnWindowFocus: false,
                refetchOnReconnect: true,
            },
            mutations: {
                retry: false,
            },
        },
    });

let queryClient: QueryClient | null = null;

export const getQueryClient = (): QueryClient => {
    if (!queryClient) {
        queryClient = createQueryClient();
    }
    return queryClient;
};
