import { fontSize } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { useMemo } from 'react';
import { Text as RNText } from 'react-native';

type RNTextProps = React.ComponentProps<typeof RNText>;

type Variant = 'default' | 'primary' | 'secondary' | 'danger';
export const Text = ({
    children,
    style,
    variant = 'default',
    ...props
}: RNTextProps & { variant?: Variant }) => {
    const { colors } = useTheme();

    const variantStyles = useMemo(() => {
        switch (variant) {
            case 'primary':
                return { color: colors.primary };
            case 'secondary':
                return { color: colors.textSecondary };
            case 'danger':
                return { color: colors.error };
            default:
                return { color: colors.text };
        }
    }, [variant, colors.primary, colors.textSecondary, colors.error, colors.text]);

    return (
        <RNText style={[{ fontSize: fontSize.base }, variantStyles, style]} {...props}>
            {children}
        </RNText>
    );
};
