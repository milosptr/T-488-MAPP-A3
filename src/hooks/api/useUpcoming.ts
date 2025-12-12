import { apiClient, queryKeys, STALE_TIMES } from '@/src/api';
import type { UpcomingMovie, UpcomingQueryParams } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

const processUpcomingMovies = async (params?: UpcomingQueryParams) => {
    const movies = await apiClient<UpcomingMovie[]>('/upcoming', {
        params: params as Record<string, string | number | undefined>,
    });
    const seen = new Set<string>();
    const uniqueMovies = movies.filter(movie => {
        const id = movie.id.toString();
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
    return uniqueMovies.sort((a, b) => {
        const dateA = new Date(a['release-dateIS']).getTime();
        const dateB = new Date(b['release-dateIS']).getTime();
        return dateA - dateB;
    });
};

export const useUpcoming = (params?: UpcomingQueryParams) => {
    return useQuery({
        queryKey: queryKeys.upcoming.list(params),
        queryFn: () => processUpcomingMovies(params),
        staleTime: STALE_TIMES.upcoming,
    });
};
