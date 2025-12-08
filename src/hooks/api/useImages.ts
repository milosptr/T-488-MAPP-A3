import { queryKeys, STALE_TIMES, tmdbClient } from '@/src/api';
import type { ImageInfo, TmdbImagesResponse } from '@/src/types';
import { useQuery } from '@tanstack/react-query';

export const useImages = (tmdbId: number | undefined) => {
    return useQuery({
        queryKey: queryKeys.images.byTmdbId(tmdbId ?? 0),
        queryFn: () => tmdbClient<TmdbImagesResponse>(`/movie/${tmdbId}/images`),
        enabled: !!tmdbId,
        staleTime: STALE_TIMES.images,
    });
};

const ASPECT_RATIO_16_9 = 16 / 9;
const ASPECT_RATIO_TOLERANCE = 0.05;

export const useMovieBackdrop = (tmdbId: number | undefined | null): string | null => {
    const { data: images } = useImages(tmdbId ?? undefined);

    if (!images?.backdrops.length) return null;

    const backdrops16x9 = images.backdrops.filter(
        (img: ImageInfo) => Math.abs(img.aspect_ratio - ASPECT_RATIO_16_9) < ASPECT_RATIO_TOLERANCE
    );

    if (!backdrops16x9.length) return null;

    const best = backdrops16x9.reduce((a: ImageInfo, b: ImageInfo) =>
        b.vote_average > a.vote_average ? b : a
    );

    return `https://image.tmdb.org/t/p/w1280${best.file_path}`;
};
