import { borderRadius } from '@/src/constants/DesignTokens';
import { useFavorites, useShare } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Link, useRouter } from 'expo-router';
import { Image, Platform } from 'react-native';
import { MovieCard } from './MovieCard';

type Props = {
    movie: Movie;
};

export const MovieListItem = ({ movie }: Props) => {
    const router = useRouter();
    const { toggleFavoriteStatus, isFavorite } = useFavorites();
    const { shareMovie } = useShare();

    if (Platform.OS === 'android') {
        return (
            <Link href={`/movies/${movie._id}`}>
                <MovieCard movie={movie} />
            </Link>
        );
    }

    const isMovieFavorite = isFavorite(movie._id);

    return (
        <Link href={`/movies/${movie._id}`}>
            <Link.Trigger>
                <MovieCard movie={movie} />
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
