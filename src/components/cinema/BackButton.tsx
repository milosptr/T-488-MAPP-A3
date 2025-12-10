import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

const BUTTON_SIZE = 40;
const ICON_SIZE = 24;

export const BackButton = () => {
    const router = useRouter();
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.back()}
                style={[styles.button, { backgroundColor: colors.surface }]}
            >
                <Ionicons name="arrow-back" size={ICON_SIZE} color={colors.text} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
