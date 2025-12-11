import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { LiquidButton } from '../ui';

const BUTTON_SIZE = 48;
const ICON_SIZE = 24;

export const BackButton = () => {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <LiquidButton
                onPress={() => router.back()}
                style={[styles.button, { backgroundColor: colors.surface }]}
                leadingIcon={<Ionicons name="arrow-back" size={ICON_SIZE} color={colors.text} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: spacing.md,
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: borderRadius.full,
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
