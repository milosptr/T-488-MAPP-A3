import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { Movie } from '@/src/types';
import { useTheme } from '@react-navigation/native';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '../ui';
import { CinemaMovieCard } from './CinemaMovieCard';

type Props = {
    cinema: { id: number; name: string };
    movies: Movie[];
};

export const CinemaSection = ({ cinema, movies }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text
                style={[styles.cinemaName, { borderBottomColor: colors.border }]}
                numberOfLines={1}
            >
                {cinema.name}
            </Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {movies.map(movie => (
                    <CinemaMovieCard key={movie._id} movie={movie} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    cinemaName: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
    },
    scrollContent: {
        flexDirection: 'row',
        gap: spacing.md,
    },
});
