import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { Text } from '../ui';

const ICON_SIZE = 64;
const ICON_OPACITY = 0.3;
const SUBTITLE_OPACITY = 0.6;

export const EmptyFavourites = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Ionicons
                name="heart-outline"
                size={ICON_SIZE}
                color={colors.text}
                style={styles.icon}
            />
            <Text style={styles.title}>No favorites yet</Text>
            <Text variant="secondary" style={styles.subtitle}>
                Tap the heart icon on any movie to add it to your favorites
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
