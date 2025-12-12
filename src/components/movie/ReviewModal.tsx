import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { Button, StarRating, Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { useAppDispatch, useAppSelector } from '@/src/store';
import { addReview, Review, saveReviews } from '@/src/store/slices';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';

type Props = {
    movieId: string;
    movieTitle: string;
};

const INPUT_HEIGHT = 50;
const TEXT_INPUT_MIN_HEIGHT = 120;

export const ReviewModal = forwardRef<BottomSheetModal, Props>(({ movieId, movieTitle }, ref) => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const existingReviews = useAppSelector(state => state.reviews.reviews);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [userName, setUserName] = useState('');
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetModal);

    const resetForm = () => {
        setRating(0);
        setReviewText('');
        setUserName('');
    };

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Rating Required', 'Please select a rating before submitting');
            return;
        }

        const newReview: Review = {
            id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            movieId,
            rating,
            text: reviewText.trim(),
            userName: userName.trim() || undefined,
            createdAt: new Date().toISOString(),
        };

        dispatch(
            addReview({
                movieId,
                rating,
                text: reviewText.trim(),
                userName: userName.trim() || undefined,
            })
        );

        saveReviews([newReview, ...existingReviews]);

        resetForm();
        Alert.alert('Success', 'Your review has been added!');
        bottomSheetRef.current?.dismiss();
    };

    return (
        <BottomSheetModal ref={bottomSheetRef} snapPoints={['75%']}>
            <View style={styles.container}>
                <Text style={styles.title}>Review {movieTitle}</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Your Name (Optional)</Text>
                    <TextInput
                        style={[
                            styles.nameInput,
                            {
                                backgroundColor: colors.surface,
                                color: colors.text,
                                borderColor: colors.border,
                            },
                        ]}
                        placeholder="Enter your name"
                        placeholderTextColor={colors.textSecondary}
                        value={userName}
                        onChangeText={setUserName}
                        maxLength={50}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Your Rating</Text>
                    <View style={styles.starsContainer}>
                        <StarRating rating={rating} size="lg" onRatingChange={setRating} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Your Review (Optional)</Text>
                    <TextInput
                        style={[
                            styles.textInput,
                            {
                                backgroundColor: colors.surface,
                                color: colors.text,
                                borderColor: colors.border,
                            },
                        ]}
                        placeholder="Share your thoughts about this movie..."
                        placeholderTextColor={colors.textSecondary}
                        value={reviewText}
                        onChangeText={setReviewText}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <Button title="Submit Review" onPress={handleSubmit} />
            </View>
        </BottomSheetModal>
    );
});

ReviewModal.displayName = 'ReviewModal';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        marginBottom: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    label: {
        fontSize: fontSize.base,
        fontWeight: '600',
        marginBottom: spacing.md,
    },
    starsContainer: {
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    nameInput: {
        borderWidth: 1,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSize.base,
        height: INPUT_HEIGHT,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSize.base,
        minHeight: TEXT_INPUT_MIN_HEIGHT,
    },
});
