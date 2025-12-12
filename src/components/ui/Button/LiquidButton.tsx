import { borderRadius, fontSize } from '@/src/constants/DesignTokens';
import { haptics, isGlassAvailable } from '@/src/utils';
import { GlassView } from 'expo-glass-effect';
import { ReactNode, useCallback } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '../Text';

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

    if (!isGlassAvailable()) {
        return (
            <Pressable onPress={handlePress}>
                <View style={[styles.container, styles.androidFallback, style]}>
                    {leadingIcon}
                    {!!text && <Text style={[styles.text, textStyle]}>{text}</Text>}
                    {trailingIcon}
                </View>
            </Pressable>
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
        borderRadius: borderRadius.lg,
        gap: 6,
    },
    androidFallback: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    text: {
        fontWeight: '600',
        fontSize: fontSize.lg,
    },
});
