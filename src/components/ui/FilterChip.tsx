import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReactNode, useMemo } from 'react';
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
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
} & Omit<TouchableOpacityProps, 'onPress' | 'style'>;

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
        <TouchableOpacity
            onPress={onPress}
            {...props}
            style={[
                styles.container,
                {
                    borderColor: selected ? theme.colors.primary : theme.colors.border,
                    backgroundColor: selected ? theme.colors.scrim : 'transparent',
                },
                style,
            ]}
        >
            {_leadingIcon}
            <Text style={{ fontWeight: '500' }}>{title}</Text>
            {_trailingIcon}
        </TouchableOpacity>
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
});
