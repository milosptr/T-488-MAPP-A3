import { StarRating, Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Review } from '@/src/store/slices';
import { StyleSheet, View } from 'react-native';

type Props = {
    review: Review;
};

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

export const ReviewItem = ({ review }: Props) => {
    const { colors } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
        >
            <View style={styles.header}>
                <View style={styles.info}>
                    <Text style={styles.userName}>{review.userName || 'Anonymous'}</Text>
                    <Text variant="secondary" style={styles.date}>
                        {formatDate(review.createdAt)}
                    </Text>
                </View>
                <StarRating rating={review.rating} size="sm" />
            </View>
            {review.text && <Text style={styles.reviewText}>{review.text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        gap: spacing.sm,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    info: {
        flex: 1,
    },
    userName: {
        fontSize: fontSize.sm,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },
    date: {
        fontSize: fontSize.xs,
    },
    reviewText: {
        fontSize: fontSize.sm,
        lineHeight: fontSize.sm * 1.4,
    },
});
