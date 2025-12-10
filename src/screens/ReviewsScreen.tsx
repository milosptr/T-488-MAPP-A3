import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { ReviewItem, ReviewModal, ReviewsEmpty } from '@/src/components/movie';
import { Button, LiquidButton, StarRating, Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import {
    Review,
    selectAverageRatingByMovieId,
    selectReviewsByMovieId,
    useAppSelector,
} from '@/src/store';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaScreen } from '../components/layout';

const BACK_ICON_SIZE = 24;

const keyExtractor = (item: Review) => item.id;

export const ReviewsScreen = () => {
    const { colors } = useTheme();
    const router = useRouter();
    const { id, title } = useLocalSearchParams<{ id: string; title: string }>();
    const insets = useSafeAreaInsets();
    const reviewModalRef = useRef<BottomSheetModal>(null);

    const reviews = useAppSelector(state => selectReviewsByMovieId(state, id ?? ''));
    const averageRating = useAppSelector(state => selectAverageRatingByMovieId(state, id ?? ''));

    const hasReviews = reviews.length > 0;
    const movieTitle = title ?? 'Movie';

    const renderItem = ({ item }: { item: Review }) => <ReviewItem review={item} />;

    const renderHeader = () => (
        <View style={styles.summaryContainer}>
            {hasReviews && (
                <>
                    <View style={styles.ratingRow}>
                        <StarRating rating={Math.round(averageRating)} size="md" />
                        <Text style={styles.ratingText}>{averageRating.toFixed(1)} / 5</Text>
                    </View>
                    <Text variant="secondary" style={styles.countText}>
                        {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                    </Text>
                </>
            )}
        </View>
    );

    const renderEmpty = () => <ReviewsEmpty />;

    return (
        <SafeAreaScreen>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={[styles.header, { borderBottomColor: colors.border }]}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle} numberOfLines={1}>
                            Reviews
                        </Text>
                        <Text variant="secondary" style={styles.headerSubtitle} numberOfLines={1}>
                            {movieTitle}
                        </Text>
                    </View>
                </View>
                <View style={styles.closeButtonContainer}>
                    <LiquidButton
                        onPress={() => router.back()}
                        style={styles.closeButton}
                        leadingIcon={
                            <Ionicons
                                name="chevron-back"
                                size={BACK_ICON_SIZE}
                                color={colors.text}
                            />
                        }
                    />
                </View>

                <FlatList
                    data={reviews}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    ListHeaderComponent={renderHeader}
                    ListEmptyComponent={renderEmpty}
                    contentContainerStyle={[
                        styles.listContent,
                        { paddingBottom: insets.bottom + 80 },
                    ]}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    showsVerticalScrollIndicator={false}
                />

                <View
                    style={[
                        styles.footer,
                        {
                            backgroundColor: colors.background,
                            borderTopColor: colors.border,
                            paddingBottom: insets.bottom || spacing.md,
                        },
                    ]}
                >
                    <Button
                        title="Write Review"
                        onPress={() => reviewModalRef.current?.present()}
                    />
                </View>

                <ReviewModal ref={reviewModalRef} movieId={id ?? ''} movieTitle={movieTitle} />
            </View>
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: spacing.sm,
        left: 0,
        zIndex: 1,
    },
    closeButton: {
        height: 48,
        width: 48,
        paddingHorizontal: 0,
        borderRadius: 100,
    },
    headerTitleContainer: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: fontSize.lg,
        fontWeight: '600',
    },
    headerSubtitle: {
        fontSize: fontSize.sm,
    },
    summaryContainer: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
        gap: spacing.sm,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    ratingText: {
        fontSize: fontSize.xl,
        fontWeight: '600',
    },
    countText: {
        fontSize: fontSize.sm,
    },
    listContent: {
        padding: spacing.lg,
    },
    separator: {
        height: spacing.md,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
        borderTopWidth: 1,
    },
});
