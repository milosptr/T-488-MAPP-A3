import { queryKeys, STALE_TIMES, tmdbClient } from '@/src/api';
import { Movie, TmdbImagesResponse } from '@/src/types';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 100;

export const usePrefetchBackdrops = (movies: Movie[]) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        if (movies.length === 0) return;

        const tmdbIds = [
            ...new Set(movies.map(m => m.ids.tmdb).filter((id): id is number => !!id)),
        ];

        let cancelled = false;

        const prefetchAll = async () => {
            for (let i = 0; i < tmdbIds.length && !cancelled; i += BATCH_SIZE) {
                const batch = tmdbIds.slice(i, i + BATCH_SIZE);

                await Promise.all(
                    batch.map(tmdbId =>
                        queryClient.prefetchQuery({
                            queryKey: queryKeys.images.byTmdbId(tmdbId),
                            queryFn: () =>
                                tmdbClient<TmdbImagesResponse>(`/movie/${tmdbId}/images`),
                            staleTime: STALE_TIMES.images,
                        })
                    )
                );

                if (i + BATCH_SIZE < tmdbIds.length && !cancelled) {
                    await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
                }
            }
        };

        prefetchAll();

        return () => {
            cancelled = true;
        };
    }, [movies, queryClient]);
};
