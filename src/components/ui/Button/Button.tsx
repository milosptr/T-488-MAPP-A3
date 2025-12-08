import { borderRadius } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks/useTheme';
import * as Haptics from 'expo-haptics';
import { ReactNode, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';

type Props = {
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outlined' | 'danger' | 'success';
    title?: string;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    onPress?: () => void;
};

const sizes = {
    small: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 14,
    },
    medium: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        fontSize: 16,
    },
    large: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        fontSize: 18,
    },
};

export const Button = ({
    size = 'medium',
    variant = 'default',
    title,
    leadingIcon,
    trailingIcon,
    onPress,
}: Props) => {
    const theme = useTheme();
    const sizeStyles = sizes[size];

    const handlePress = useCallback(() => {
        if (variant === 'danger') {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.();
    }, [variant, onPress]);

    const getVariantStyles = () => {
        switch (variant) {
            case 'outlined':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: theme.colors.primary,
                };
            case 'danger':
                return {
                    backgroundColor: theme.colors.error,
                };
            case 'success':
                return {
                    backgroundColor: theme.colors.success,
                };
            default:
                return {
                    backgroundColor: theme.colors.primary,
                };
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'outlined':
                return theme.colors.primary;
            case 'danger':
                return theme.colors.onError;
            case 'success':
                return theme.colors.onSuccess;
            default:
                return theme.colors.onPrimary;
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={handlePress}>
            <View style={[styles.container, getVariantStyles(), sizeStyles]}>
                {leadingIcon}
                {!!title && (
                    <Text
                        style={[
                            styles.title,
                            { color: getTextColor(), fontSize: sizeStyles.fontSize },
                        ]}
                    >
                        {title}
                    </Text>
                )}
                {trailingIcon}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: borderRadius.lg,
        gap: 6,
    },
    title: {
        fontWeight: '600',
    },
});
