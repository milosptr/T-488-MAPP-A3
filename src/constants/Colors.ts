import { fonts } from './fonts';

const palette = {
    textDark: '#000',
    textLight: '#fff',
    backgroundDark: '#000',
    backgroundLight: '#fff',
    tintDark: '#000',
    tintLight: '#fff',
    tabIconDefaultDark: '#ccc',
    tabIconDefaultLight: '#ccc',
    tabIconSelectedDark: '#000',
    tabIconSelectedLight: '#fff',
    primaryLight: '#000',
    primaryDark: '#fff',
    cardLight: '#000',
    cardDark: '#fff',
    borderLight: '#000',
    borderDark: '#fff',
    notificationLight: '#000',
    notificationDark: '#fff',
};

export const Colors = {
    light: {
        text: palette.textLight,
        background: palette.backgroundLight,
        tint: palette.tintLight,
        tabIconDefault: palette.tabIconDefaultLight,
        tabIconSelected: palette.tabIconSelectedLight,
        primary: palette.primaryLight,
        card: palette.cardLight,
        border: palette.borderLight,
        notification: palette.notificationLight,
    },
    dark: {
        text: palette.textDark,
        background: palette.backgroundDark,
        tint: palette.tintDark,
        tabIconDefault: palette.tabIconDefaultDark,
        tabIconSelected: palette.tabIconSelectedDark,
        primary: palette.primaryDark,
        card: palette.cardDark,
        border: palette.borderDark,
        notification: palette.notificationDark,
    },
} as const;

export const getTheme = (colorScheme: 'light' | 'dark') => {
    return {
        dark: colorScheme === 'dark',
        colors: {
            ...Colors[colorScheme],
        },
        fonts,
    };
};
