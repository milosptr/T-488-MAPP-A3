import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from '../ui';

type Props = {
    error: string | null;
    invalidCount?: number;
};

const ICON_SIZE = 64;
const ICON_OPACITY = 0.3;
const SUBTITLE_OPACITY = 0.6;

export const EmptySharedFavourites = ({ error, invalidCount = 0 }: Props) => {
    const { colors } = useTheme();

    const title = error || 'No movies found';
    const subtitle = error
        ? 'This link may be broken or expired'
        : `${invalidCount} movie${invalidCount !== 1 ? 's' : ''} could not be loaded`;

    return (
        <View style={styles.container}>
            <Ionicons
                name="link-outline"
                size={ICON_SIZE}
                color={colors.text}
                style={styles.icon}
            />
            <Text style={styles.title}>{title}</Text>
            <Text variant="secondary" style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
    },
    icon: {
        opacity: ICON_OPACITY,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSize.sm,
        textAlign: 'center',
        opacity: SUBTITLE_OPACITY,
    },
});
