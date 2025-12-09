import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { Text } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { addReview } from '@/src/store/slices';
import { useAppDispatch } from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

type Props = {
    movieId: string;
    movieTitle: string;
};

export const ReviewModal = forwardRef<BottomSheetModal, Props>(
    ({ movieId, movieTitle }, ref) => {
        const { colors } = useTheme();
        const dispatch = useAppDispatch();
        const [rating, setRating] = useState(0);
        const [reviewText, setReviewText] = useState('');
        const [userName, setUserName] = useState('');
        const bottomSheetRef = useRef<BottomSheetModal>(null);

        useImperativeHandle(ref, () => bottomSheetRef.current as BottomSheetModal);

        const handleSubmit = () => {
            if (rating === 0) {
                Alert.alert('Rating Required', 'Please select a rating before submitting');
                return;
            }

            dispatch(
                addReview({
                    movieId,
                    rating,
                    text: reviewText.trim(),
                    userName: userName.trim() || undefined,
                })
            );

            // Reset form
            setRating(0);
            setReviewText('');
            setUserName('');

            Alert.alert('Success', 'Your review has been added!');
            
            // Close modal
            bottomSheetRef.current?.dismiss();
        };

        const renderStars = () => {
            return (
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Pressable
                            key={star}
                            onPress={() => setRating(star)}
                            style={styles.starButton}
                        >
                            <Ionicons
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={40}
                                color={star <= rating ? '#FFD700' : colors.text}
                            />
                        </Pressable>
                    ))}
                </View>
            );
        };

        return (
            <BottomSheetModal ref={bottomSheetRef} snapPoints={['75%']}>
                <View style={[styles.container, { backgroundColor: colors.background }]}>
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
                            placeholderTextColor={colors.text + '60'}
                            value={userName}
                            onChangeText={setUserName}
                            maxLength={50}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Your Rating</Text>
                        {renderStars()}
                        {rating > 0 && (
                            <Text style={[styles.ratingText, { color: colors.text }]}>
                                {rating} {rating === 1 ? 'star' : 'stars'}
                            </Text>
                        )}
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

                    <Pressable
                        style={[
                            styles.submitButton,
                            { backgroundColor: colors.primary },
                            rating === 0 && styles.submitButtonDisabled,
                        ]}
                        onPress={handleSubmit}
                        disabled={rating === 0}
                    >
                        <Text style={[styles.submitButtonText, { color: colors.onPrimary }]}>
                            Submit Review
                        </Text>
                    </Pressable>
                </View>
            </BottomSheetModal>
        );
    }
);

ReviewModal.displayName = 'ReviewModal';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: spacing.md,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    starButton: {
        padding: spacing.xs,
    },
    ratingText: {
        textAlign: 'center',
        fontSize: 14,
        opacity: 0.7,
    },
    nameInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: spacing.md,
        fontSize: 16,
        height: 50,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: spacing.md,
        fontSize: 16,
        minHeight: 120,
    },
    submitButton: {
        padding: spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
