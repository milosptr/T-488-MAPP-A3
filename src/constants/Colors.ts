import { fonts } from './fonts';

const palette = {
    primary: '#489784',
    primaryLight: '#6bb8c2',
    primaryDark: '#3a8088',

    secondary: '#e85a3a',
    secondaryLight: '#f07858',
    secondaryDark: '#c44a2a',

    white: '#f2f2f2',
    dirtyWhite: '#d5d5d5',
    gray: '#7a7f82',
    black: '#1e2022',
    dirtyBlack: '#141820',
    trueBlack: '#111111',
    pureBlack: '#000000',

    whiteTeal: '#f5f7f7',
    surfaceLight: '#fafbfb',
    neutral100Teal: '#e3e8e8',
    neutral200Teal: '#c8d0d0',
    neutral300Teal: '#9aa2a2',

    backgroundDark: '#0E181A',
    surfaceDark: '#1c2a2d',

    neutral300: '#9a9fa2',

    error: '#c94444',
    errorLight: '#db6b6b',

    success: '#4a9960',
    successLight: '#6db57f',

    action: '#4a7fc9',
    actionLight: '#6b9bd9',
};

export const Colors = {
    light: {
        primary: palette.primary,
        background: palette.whiteTeal,
        card: palette.surfaceLight,
        text: palette.black,
        textSecondary: palette.dirtyBlack,
        border: palette.neutral200Teal,
        notification: palette.error,

        onPrimary: '#ffffff',

        secondary: palette.secondary,
        onSecondary: '#ffffff',

        surface: palette.surfaceLight,
        onSurface: palette.black,
        surfaceVariant: palette.neutral100Teal,

        error: palette.error,
        onError: '#ffffff',
        success: palette.success,
        onSuccess: '#ffffff',

        action: palette.action,

        scrim: 'rgba(98, 176, 186, 0.4)',
        trueBlack: palette.trueBlack,
    },
    dark: {
        primary: palette.primary,
        background: palette.backgroundDark,
        card: palette.pureBlack,
        text: palette.white,
        textSecondary: palette.dirtyWhite,
        border: '#354547',
        notification: palette.errorLight,

        onPrimary: palette.black,

        secondary: palette.secondaryLight,
        onSecondary: palette.black,

        surface: palette.surfaceDark,
        onSurface: palette.white,
        surfaceVariant: '#253638',
        onSurfaceVariant: palette.neutral300,

        error: palette.errorLight,
        onError: palette.black,
        success: palette.successLight,
        onSuccess: palette.black,

        action: palette.actionLight,

        scrim: 'rgba(27, 48, 51, 0.6)',
        trueBlack: palette.trueBlack,
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
