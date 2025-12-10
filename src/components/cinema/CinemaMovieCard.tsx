import { Movie } from '@/src/types';
import { StyleSheet, View } from 'react-native';
import { MovieListItem } from '../movie';

type Props = {
    movie: Movie;
    width?: number;
};

const CARD_WIDTH = 260;

export const CinemaMovieCard = ({ movie, width = CARD_WIDTH }: Props) => {
    return (
        <View style={[styles.container, { width }]}>
            <MovieListItem movie={movie} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: CARD_WIDTH,
    },
});
