import { useColorScheme } from 'react-native';
import { getTheme } from '../constants/Colors';

export const useTheme = () => {
    const colorScheme = useColorScheme();

    return getTheme(colorScheme ?? 'light');
};
