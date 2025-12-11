import { MOVIE_LIST_ITEM_WIDTH } from '@/src/constants/constants';
import { borderRadius } from '@/src/constants/DesignTokens';
import { useFavorites, useShare } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { Platform, StyleSheet, ViewStyle } from 'react-native';
import { MovieCard } from './MovieCard';

const styles = StyleSheet.create({
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: borderRadius.md,
    },
});

type Props = {
    movie: Movie;
    cinemaId?: number;
    width?: ViewStyle['width'];
    horizontal?: boolean;
};

export const MovieListItem = ({
    movie,
    cinemaId,
    width = MOVIE_LIST_ITEM_WIDTH,
    horizontal = false,
}: Props) => {
    const router = useRouter();
    const { toggleFavoriteStatus, isFavorite } = useFavorites();
    const { shareMovie } = useShare();
    const cinemaPath = cinemaId ? `?cinemaId=${cinemaId}` : '';

    if (Platform.OS === 'android') {
        return (
            <Link href={`/movies/${movie._id}${cinemaPath}`}>
                <MovieCard movie={movie} width={width} horizontal={horizontal} />
            </Link>
        );
    }

    const isMovieFavorite = isFavorite(movie._id);

    return (
        <Link href={`/movies/${movie._id}${cinemaPath}`}>
            <Link.Trigger>
                <MovieCard movie={movie} width={width} horizontal={horizontal} />
            </Link.Trigger>
            <Link.Preview>
                <Image
                    source={{ uri: movie.poster }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    recyclingKey={movie._id}
                    style={styles.previewImage}
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
