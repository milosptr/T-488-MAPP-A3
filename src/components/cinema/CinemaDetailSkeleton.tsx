import { Skeleton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

export const CinemaDetailSkeleton = () => {
    return (
        <View style={styles.container}>
            <Skeleton show width="60%" height={32} radius={borderRadius.sm} />
            <Skeleton show width="100%" height={60} radius={borderRadius.sm} />
            <Skeleton show width="100%" height={1} />
            <Skeleton show width="80%" height={20} radius={borderRadius.sm} />
            <Skeleton show width="50%" height={20} radius={borderRadius.sm} />
            <Skeleton show width="60%" height={20} radius={borderRadius.sm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
});
