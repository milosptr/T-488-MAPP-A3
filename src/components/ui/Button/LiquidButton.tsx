import { fontSize } from '@/src/constants/DesignTokens';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { ReactNode, useCallback } from 'react';
import { Platform, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { Button } from './Button';

type Props = {
    leadingIcon?: ReactNode;
    text?: string;
    trailingIcon?: ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    glassEffectStyle?: 'clear' | 'regular';
};

export const LiquidButton = ({
    leadingIcon,
    text,
    trailingIcon,
    onPress,
    style,
    glassEffectStyle = 'clear',
}: Props) => {
    const handlePress = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
    }, [onPress]);

    if (Platform.OS !== 'ios' || !isLiquidGlassAvailable()) {
        return (
            <Button
                title={text}
                leadingIcon={leadingIcon}
                trailingIcon={trailingIcon}
                onPress={onPress}
            />
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <GlassView style={[styles.container, style]} glassEffectStyle={glassEffectStyle}>
                {leadingIcon}
                {!!text && <Text style={styles.text}>{text}</Text>}
                {trailingIcon}
            </GlassView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 20,
        gap: 6,
    },
    text: {
        fontWeight: '600',
        fontSize: fontSize.lg,
    },
});
