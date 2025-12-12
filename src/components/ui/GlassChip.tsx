import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { haptics, isGlassAvailable } from '@/src/utils';
import { GlassView } from 'expo-glass-effect';
import { useCallback } from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from './Text';

type Props = {
    label: string;
    subtitle?: string;
    selected?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
};

export const GlassChip = ({
    label,
    subtitle,
    selected = false,
    onPress,
    style,
    disabled = false,
}: Props) => {
    const { colors } = useTheme();

    const handlePress = useCallback(() => {
        haptics.light();
        onPress?.();
    }, [onPress]);

    const renderContent = () => (
        <>
            <Text style={styles.label}>{label}</Text>
            {!!subtitle && (
                <Text style={styles.subtitle} numberOfLines={1}>
                    {subtitle}
                </Text>
            )}
        </>
    );

    const selectedStyle = selected
        ? { backgroundColor: colors.primary, borderColor: colors.primary }
        : undefined;

    if (isGlassAvailable() && !selected) {
        return (
            <Pressable onPress={handlePress} disabled={disabled} style={style}>
                <GlassView style={styles.container} glassEffectStyle="clear" isInteractive>
                    {renderContent()}
                </GlassView>
            </Pressable>
        );
    }

    return (
        <Pressable onPress={handlePress} disabled={disabled} style={style}>
            <View
                style={[
                    styles.container,
                    styles.fallback,
                    { borderColor: colors.border },
                    selectedStyle,
                ]}
            >
                {renderContent()}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallback: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
    },
    label: {
        fontSize: fontSize.lg,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: fontSize.sm,
        opacity: 0.7,
        marginTop: spacing.xs,
    },
});
