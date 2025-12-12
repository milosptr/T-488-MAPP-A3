import { animation, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { haptics } from '@/src/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
    Animated,
    Pressable,
    PressableProps,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { Text } from './Text';

type Props = {
    title: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    leadingIcon?: ReactNode | React.JSX.Element;
    trailingIcon?: ReactNode | React.JSX.Element;
    hideLeadingIcon?: boolean;
    hideTrailingIcon?: boolean;
    selected?: boolean;
} & Omit<PressableProps, 'onPress' | 'style'>;

const PRESS_SCALE = 0.97;

export const FilterChip = ({
    title,
    onPress,
    style,
    leadingIcon,
    trailingIcon,
    hideLeadingIcon = false,
    hideTrailingIcon = false,
    selected = false,
    ...props
}: Props) => {
    const theme = useTheme();
    const [scaleAnim] = useState(() => new Animated.Value(1));

    const handlePressIn = useCallback(() => {
        Animated.timing(scaleAnim, {
            toValue: PRESS_SCALE,
            duration: animation.fast,
            useNativeDriver: true,
        }).start();
    }, [scaleAnim]);

    const handlePressOut = useCallback(() => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: animation.fast,
            useNativeDriver: true,
        }).start();
    }, [scaleAnim]);

    const handlePress = useCallback(() => {
        haptics.selection();
        onPress?.();
    }, [onPress]);

    const _leadingIcon = useMemo(() => {
        if (hideLeadingIcon) return null;
        return leadingIcon;
    }, [hideLeadingIcon, leadingIcon]);

    const _trailingIcon = useMemo(() => {
        if (hideTrailingIcon) return null;
        if (trailingIcon) return trailingIcon;
        return <Ionicons name="chevron-down" size={16} color={theme.colors.text} />;
    }, [hideTrailingIcon, trailingIcon, theme.colors.text]);

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
            <Pressable
                onPress={handlePress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                {...props}
                style={[
                    styles.container,
                    {
                        borderColor: selected ? theme.colors.primary : theme.colors.border,
                        backgroundColor: selected ? theme.colors.scrim : 'transparent',
                    },
                ]}
            >
                {_leadingIcon}
                <Text style={styles.title}>{title}</Text>
                {_trailingIcon}
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: spacing.xl,
        borderWidth: 1,
    },
    title: {
        fontWeight: '500',
    },
});
