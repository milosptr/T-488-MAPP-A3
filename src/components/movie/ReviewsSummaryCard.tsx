import { StarRating, Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { selectAverageRatingByMovieId, selectReviewsByMovieId, useAppSelector } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
    movieId: string;
    movieTitle: string;
};

const CHEVRON_SIZE = 20;

export const ReviewsSummaryCard = ({ movieId, movieTitle }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();
    const reviews = useAppSelector(state => selectReviewsByMovieId(state, movieId));
    const averageRating = useAppSelector(state => selectAverageRatingByMovieId(state, movieId));

    const reviewCount = reviews.length;
    const hasReviews = reviewCount > 0;

    const handlePress = () => {
        router.push({
            pathname: '/movies/[id]/reviews',
            params: { id: movieId, title: movieTitle },
        });
    };

    return (
        <View style={[styles.wrapper, { borderColor: colors.border }]}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => [
                    styles.container,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    pressed && styles.pressed,
                ]}
            >
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Reviews</Text>
                        {hasReviews && (
                            <View style={styles.ratingContainer}>
                                <StarRating rating={Math.round(averageRating)} size="xs" />
                                <Text style={styles.ratingText}>{averageRating.toFixed(1)}</Text>
                            </View>
                        )}
                    </View>
                    <Text variant="secondary" style={styles.subtitle}>
                        {hasReviews
                            ? `${reviewCount} review${reviewCount !== 1 ? 's' : ''}`
                            : 'No reviews yet'}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textSecondary} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        borderTopWidth: 1,
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
    },
    pressed: {
        opacity: 0.7,
    },
    content: {
        flex: 1,
        gap: spacing.xs,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    title: {
        fontSize: fontSize.base,
        fontWeight: '600',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    ratingText: {
        fontSize: fontSize.xs,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: fontSize.sm,
    },
});
