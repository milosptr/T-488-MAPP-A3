import { MOVIE_LIST_ITEM_WIDTH } from '@/src/constants/constants';
import { borderRadius } from '@/src/constants/DesignTokens';
import { useFavorites, useShare } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Link, useRouter } from 'expo-router';
import { Image, Platform, ViewStyle } from 'react-native';
import { MovieCard } from './MovieCard';

type Props = {
    movie: Movie;
    cinemaId?: number;
    width?: ViewStyle['width'];
};

export const MovieListItem = ({ movie, cinemaId, width = MOVIE_LIST_ITEM_WIDTH }: Props) => {
    const router = useRouter();
    const { toggleFavoriteStatus, isFavorite } = useFavorites();
    const { shareMovie } = useShare();
    const cinemaPath = cinemaId ? `?cinemaId=${cinemaId}` : '';

    if (Platform.OS === 'android') {
        return (
            <Link href={`/movies/${movie._id}${cinemaPath}`}>
                <MovieCard movie={movie} width={width} showGenres />
            </Link>
        );
    }

    const isMovieFavorite = isFavorite(movie._id);

    return (
        <Link href={`/movies/${movie._id}${cinemaPath}`}>
            <Link.Trigger>
                <MovieCard movie={movie} width={width} showGenres />
            </Link.Trigger>
            <Link.Preview>
                <Image
                    source={{ uri: movie.poster }}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: borderRadius.md,
                    }}
                />
            </Link.Preview>
            <Link.Menu>
                <Link.MenuAction
                    title="Open"
                    icon="eye"
                    onPress={() => router.push(`/movies/${movie._id}`)}
                />
                <Link.MenuAction
                    title="Share"
                    icon="square.and.arrow.up"
                    onPress={() => shareMovie(movie)}
                />
                <Link.MenuAction
                    title={isMovieFavorite ? 'Remove from favourites' : 'Add to favourites'}
                    icon={isMovieFavorite ? 'heart.fill' : 'heart'}
                    onPress={() => toggleFavoriteStatus(movie._id)}
                />
            </Link.Menu>
        </Link>
    );
};
