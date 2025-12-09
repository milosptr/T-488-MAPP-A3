import { spacing } from '@/src/constants/DesignTokens';
import { useAppSelector } from '@/src/store';
import { selectAverageRatingByMovieId, selectReviewsByMovieId } from '@/src/store/slices';
import { StyleSheet, View } from 'react-native';
import { MovieReviewsHeader } from './MovieReviewsHeader';
import { ReviewItem } from './ReviewItem';
import { ReviewsEmpty } from './ReviewsEmpty';

type Props = {
    movieId: string;
};

export const MovieReviews = ({ movieId }: Props) => {
    const reviews = useAppSelector(state => selectReviewsByMovieId(state, movieId));
    const averageRating = useAppSelector(state => selectAverageRatingByMovieId(state, movieId));

    if (reviews.length === 0) {
        return <ReviewsEmpty />;
    }

    return (
        <View style={styles.container}>
            <MovieReviewsHeader count={reviews.length} averageRating={averageRating} />
            {reviews.map(review => (
                <ReviewItem key={review.id} review={review} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
});
