import { borderRadius } from '@/src/constants/DesignTokens';
import { Movie } from '@/src/types';
import { Link, useRouter } from 'expo-router';
import { Image, Platform } from 'react-native';
import { MovieCard } from './MovieCard';

type Props = {
    movie: Movie;
};

export const MovieListItem = ({ movie }: Props) => {
    const router = useRouter();

    if (Platform.OS === 'android') {
        return (
            <Link href={`/movies/${movie._id}`}>
                <MovieCard movie={movie} />
            </Link>
        );
    }

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
                <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={() => {}} />
                <Link.MenuAction title="Add to favourites" icon="heart" onPress={() => {}} />
            </Link.Menu>
        </Link>
    );
};
