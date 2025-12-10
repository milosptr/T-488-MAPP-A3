import { Skeleton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

const SKELETON_COUNT = 4;
const SKELETON_WIDTH = 60;
const SKELETON_HEIGHT = 36;

export const CinemaShowtimesSkeleton = () => {
    return (
        <View style={styles.container}>
            {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton
                    key={index}
                    show
                    width={SKELETON_WIDTH}
                    height={SKELETON_HEIGHT}
                    radius={borderRadius.sm}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
