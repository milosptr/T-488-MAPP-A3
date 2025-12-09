import { Skeleton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

export const SkeletonMovie = () => {
    return (
        <View style={styles.container}>
            <View style={styles.posterContainer}>
                <View style={styles.poster}>
                    <Skeleton show width="100%" height="100%" />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.infoDetails}>
                    <Skeleton show width={100} height={20} />
                    <Skeleton show width={100} height={20} />
                    <Skeleton show width={100} height={20} />
                </View>
                <View style={styles.details}>
                    <Skeleton show width="100%" height={24} />
                    <Skeleton show width="100%" height={20} />
                    <Skeleton show width="100%" height={20} />
                    <Skeleton show width="100%" height={20} />
                    <Skeleton show width="100%" height={20} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    posterContainer: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        aspectRatio: 10 / 16,
        marginTop: -48,
    },
    content: {
        padding: spacing.lg,
    },
    infoDetails: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        marginTop: spacing.xl,
        gap: spacing.md,
    },
});
