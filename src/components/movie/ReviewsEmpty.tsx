import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const ICON_SIZE = 48;
const ICON_OPACITY = 0.3;

export const ReviewsEmpty = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Ionicons
                name="chatbubbles-outline"
                size={ICON_SIZE}
                color={colors.text}
                style={styles.icon}
            />
            <Text variant="secondary" style={styles.text}>
                No reviews yet. Be the first to review!
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
        gap: spacing.md,
    },
    icon: {
        opacity: ICON_OPACITY,
    },
    text: {
        fontSize: fontSize.sm,
        textAlign: 'center',
    },
});
