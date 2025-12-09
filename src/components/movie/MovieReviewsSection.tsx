import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../ui';
import { MovieReviews } from './MovieReviews';
import { ReviewModal } from './ReviewModal';

export const MovieReviewsSection = ({ movieId, title }: { movieId: string; title: string }) => {
    const { colors } = useTheme();
    const reviewRef = useRef<BottomSheetModal>(null);

    return (
        <View>
            <View style={[styles.reviewsSection, { borderTopColor: colors.border }]}>
                <MovieReviews movieId={movieId} />
            </View>
            <Button
                title="Write Review"
                leadingIcon={<Ionicons name="create-outline" size={20} color={colors.onPrimary} />}
                onPress={() => reviewRef.current?.present()}
            />
            <ReviewModal ref={reviewRef} movieId={movieId} movieTitle={title} />
        </View>
    );
};

const styles = StyleSheet.create({
    reviewsSection: {
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
        borderTopWidth: 1,
        marginBottom: spacing.xl,
    },
});
