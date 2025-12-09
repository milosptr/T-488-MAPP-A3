import { getTheme } from '../constants/Colors';

export const useTheme = () => {
    const colorScheme = 'dark';

    return getTheme(colorScheme);
};
