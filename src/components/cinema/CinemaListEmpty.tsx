import { Skeleton, Text } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

type Props = {
    isLoading: boolean;
};

const SKELETON_HEIGHT = 72;
const ICON_SIZE = 48;

export const CinemaListEmpty = ({ isLoading }: Props) => {
    const { colors } = useTheme();

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Skeleton show width="100%" height={SKELETON_HEIGHT} radius={borderRadius.md} />
                <Skeleton show width="100%" height={SKELETON_HEIGHT} radius={borderRadius.md} />
                <Skeleton show width="100%" height={SKELETON_HEIGHT} radius={borderRadius.md} />
            </View>
        );
    }

    return (
        <View style={styles.emptyContainer}>
            <Ionicons
                name="film-outline"
                size={ICON_SIZE}
                color={colors.textSecondary}
                style={styles.icon}
            />
            <Text variant="secondary">No cinemas found</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
        gap: spacing.md,
    },
    icon: {
        opacity: 0.5,
    },
});
