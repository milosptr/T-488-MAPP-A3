import { spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';
import { MovieWithShowtimesSkeleton } from './MovieWithShowtimesSkeleton';

const SKELETON_COUNT = 3;

export const MoviesLoadingSkeleton = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <MovieWithShowtimesSkeleton key={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
});
