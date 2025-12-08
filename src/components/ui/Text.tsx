import { useTheme } from '@/src/hooks';
import { Text as RNText } from 'react-native';

type RNTextProps = React.ComponentProps<typeof RNText>;

export const Text = ({ children, style, ...props }: RNTextProps) => {
    const { colors } = useTheme();

    return (
        <RNText style={[{ color: colors.text }, style]} {...props}>
            {children}
        </RNText>
    );
};
