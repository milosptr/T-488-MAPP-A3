import { StarRating, Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

type Props = {
    count: number;
    averageRating: number;
};

export const MovieReviewsHeader = ({ count, averageRating }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reviews ({count})</Text>
            {count > 0 && (
                <View style={styles.average}>
                    <StarRating rating={Math.round(averageRating)} size="sm" />
                    <Text style={styles.averageText}>{averageRating.toFixed(1)} / 5</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    average: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    averageText: {
        fontSize: fontSize.base,
        fontWeight: '600',
    },
});
