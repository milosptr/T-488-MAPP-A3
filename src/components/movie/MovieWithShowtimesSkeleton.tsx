import { CinemaShowtimesSkeleton } from '@/src/components/cinema/CinemaShowtimesSkeleton';
import { Skeleton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

const ASPECT_RATIO_LANDSCAPE = 16 / 9;

export const MovieWithShowtimesSkeleton = () => {
    return (
        <View style={styles.container}>
            <Skeleton show width="100%" radius={borderRadius.md}>
                <View style={styles.posterPlaceholder} />
            </Skeleton>
            <CinemaShowtimesSkeleton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    posterPlaceholder: {
        width: '100%',
        aspectRatio: ASPECT_RATIO_LANDSCAPE,
    },
});
