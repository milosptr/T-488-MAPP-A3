import { fontSize } from '@/src/constants/DesignTokens';
import { haptics } from '@/src/utils';
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect';
import { ReactNode, useCallback } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Text } from '../Text';
import { Button } from './Button';

type Props = {
    leadingIcon?: ReactNode;
    text?: string;
    trailingIcon?: ReactNode;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    glassEffectStyle?: 'clear' | 'regular';
    tintColor?: string;
    isInteractive?: boolean;
    disableHaptic?: boolean;
};

export const LiquidButton = ({
    leadingIcon,
    text,
    trailingIcon,
    onPress,
    style,
    textStyle,
    glassEffectStyle = 'clear',
    tintColor,
    isInteractive = true,
    disableHaptic = false,
}: Props) => {
    const handlePress = useCallback(() => {
        if (!disableHaptic) {
            haptics.light();
        }
        onPress?.();
    }, [onPress, disableHaptic]);

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
        <Pressable onPress={handlePress}>
            <GlassView
                style={[styles.container, style]}
                glassEffectStyle={glassEffectStyle}
                tintColor={tintColor}
                isInteractive={isInteractive}
            >
                {leadingIcon}
                {!!text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                {trailingIcon}
            </GlassView>
        </Pressable>
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
