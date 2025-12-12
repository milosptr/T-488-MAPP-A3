import type { Movie } from '@/src/types';
import * as Linking from 'expo-linking';
import { useCallback } from 'react';
import { Share } from 'react-native';

export const useShare = () => {
    const getMovieDeepLink = useCallback((movieId: string) => {
        return Linking.createURL(`movies/${movieId}`);
    }, []);

    const getFavouritesDeepLink = useCallback((movieIds: string[]) => {
        return Linking.createURL(`favourites-shared?ids=${movieIds.join(',')}`);
    }, []);

    const shareMovie = useCallback(
        async (movie: Movie) => {
            const deepLink = getMovieDeepLink(movie._id);

            await Share.share({
                message: `Check out "${movie.title}" (${movie.year}) on Dr. Cinema!\n\n${deepLink}`,
                title: movie.title,
            });
        },
        [getMovieDeepLink]
    );

    const shareFavourites = useCallback(
        async (movieIds: string[]) => {
            const deepLink = getFavouritesDeepLink(movieIds);
            await Share.share({ message: deepLink });
        },
        [getFavouritesDeepLink]
    );

    return { shareMovie, shareFavourites, getMovieDeepLink, getFavouritesDeepLink };
};
