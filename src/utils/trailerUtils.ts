import type { UpcomingMovie } from '@/src/types';

export const getTrailerKey = (movie: UpcomingMovie): string | null => {
    if (!movie?.trailers?.length) return null;

    const allResults = movie.trailers.flatMap(t => t.results);

    return (
        allResults.find(r => r.type === 'Trailer')?.key ??
        allResults.find(r => r.name.toLowerCase().includes('trailer'))?.key ??
        allResults[0]?.key ??
        null
    );
};
