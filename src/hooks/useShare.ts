import type { Movie } from '@/src/types';
import * as Linking from 'expo-linking';
import { Share } from 'react-native';

export const useShare = () => {
    const getMovieDeepLink = (movieId: string) => Linking.createURL(`movies/${movieId}`);

    const getFavouritesDeepLink = (movieIds: string[]) =>
        Linking.createURL(`favourites-shared?ids=${movieIds.join(',')}`);

    const shareMovie = async (movie: Movie) => {
        const deepLink = getMovieDeepLink(movie._id);
        await Share.share({
            message: `Check out "${movie.title}" (${movie.year}) on Dr. Cinema!\n\n${deepLink}`,
            title: movie.title,
        });
    };

    const shareFavourites = async (movieIds: string[]) => {
        const deepLink = getFavouritesDeepLink(movieIds);
        await Share.share({ message: deepLink });
    };

    return { shareMovie, shareFavourites, getMovieDeepLink, getFavouritesDeepLink };
};
