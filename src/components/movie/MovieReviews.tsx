import { Text } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Review, selectAverageRatingByMovieId, selectReviewsByMovieId } from '@/src/store/slices';
import { useAppSelector } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
    movieId: string;
};

export const MovieReviews = ({ movieId }: Props) => {
    const { colors } = useTheme();
    const reviews = useAppSelector(state => selectReviewsByMovieId(state, movieId));
    const averageRating = useAppSelector(state => selectAverageRatingByMovieId(state, movieId));

    if (reviews.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons
                    name="chatbubbles-outline"
                    size={48}
                    color={colors.text}
                    style={{ opacity: 0.3 }}
                />
                <Text style={[styles.emptyText, { color: colors.text, opacity: 0.6 }]}>
                    No reviews yet. Be the first to review!
                </Text>
            </View>
        );
    }

    const renderStars = (rating: number) => {
        return (
            <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map(star => (
                    <Ionicons
                        key={star}
                        name={star <= rating ? 'star' : 'star-outline'}
                        size={16}
                        color="#FFD700"
                    />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Reviews ({reviews.length})</Text>
                {reviews.length > 0 && (
                    <View style={styles.averageContainer}>
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Text style={styles.averageText}>{averageRating.toFixed(1)} / 5</Text>
                    </View>
                )}
            </View>

            {reviews.map(review => (
                <ReviewItem key={review.id} review={review} renderStars={renderStars} />
            ))}
        </View>
    );
};

const ReviewItem = ({
    review,
    renderStars,
}: {
    review: Review;
    renderStars: (rating: number) => React.ReactNode;
}) => {
    const { colors } = useTheme();
    const date = new Date(review.createdAt).toLocaleDateString();

    return (
        <View
            style={[
                styles.reviewItem,
                { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
        >
            <View style={styles.reviewHeader}>
                <View style={styles.reviewInfo}>
                    <Text style={styles.userName}>{review.userName || 'Anonymous'}</Text>
                    <Text style={[styles.date, { color: colors.text, opacity: 0.6 }]}>{date}</Text>
                </View>
                {renderStars(review.rating)}
            </View>
            {review.text && (
                <Text style={[styles.reviewText, { color: colors.text }]}>{review.text}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    averageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    averageText: {
        fontSize: 16,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        gap: spacing.md,
    },
    emptyText: {
        fontSize: 14,
        textAlign: 'center',
    },
    reviewItem: {
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        gap: spacing.sm,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    reviewInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    date: {
        fontSize: 12,
    },
    starsRow: {
        flexDirection: 'row',
        gap: 2,
    },
    reviewText: {
        fontSize: 14,
        lineHeight: 20,
    },
});
