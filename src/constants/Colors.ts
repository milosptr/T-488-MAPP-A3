import { fonts } from './fonts';

const palette = {
    // Primary - Teal (deeper, richer to emerge from gradient)
    primary: '#489784',
    primaryLight: '#6bb8c2',
    primaryDark: '#3a8088',

    // Secondary - Coral/Orange (warmer for teal contrast)
    secondary: '#e85a3a',
    secondaryLight: '#f07858',
    secondaryDark: '#c44a2a',

    // Neutrals (teal-tinted to harmonize with gradient)
    white: '#f2f2f2',
    dirtyWhite: '#d5d5d5',
    gray: '#7a7f82',
    black: '#1e2022',
    dirtyBlack: '#141820',
    trueBlack: '#111111',
    pureBlack: '#000000',

    // Light theme teal-tinted neutrals
    whiteTeal: '#f5f7f7',
    surfaceLight: '#fafbfb',
    neutral100Teal: '#e3e8e8',
    neutral200Teal: '#c8d0d0',
    neutral300Teal: '#9aa2a2',

    // Dark theme backgrounds
    backgroundDark: '#0E181A',
    backgroundPrimary: '#1B3033',
    surfaceDark: '#1c2a2d',

    // Neutral scale (cool grays)
    neutral100: '#e5e7e8',
    neutral200: '#c8ccce',
    neutral300: '#9a9fa2',

    // Error - Distinct red (not confused with coral secondary)
    error: '#c94444',
    errorLight: '#db6b6b',
    errorContainer: '#fce8e8',
    errorContainerLight: '#e89a9a',

    // Success - Green harmonizing with teal
    success: '#4a9960',
    successLight: '#6db57f',
    successContainer: '#e6f4ea',

    // Action - Blue accent
    action: '#4a7fc9',
    actionLight: '#6b9bd9',
};

export const Colors = {
    light: {
        // React Navigation required
        primary: palette.primary,
        background: palette.whiteTeal,
        card: palette.surfaceLight,
        text: palette.black,
        textSecondary: palette.dirtyBlack,
        border: palette.neutral200Teal,
        notification: palette.error,

        // Material Design tokens
        onPrimary: '#ffffff',
        primaryContainer: '#c8e8ec',
        onPrimaryContainer: palette.primaryDark,

        secondary: palette.secondary,
        onSecondary: '#ffffff',
        secondaryContainer: '#fcdcd4',
        onSecondaryContainer: palette.secondaryDark,

        onBackground: palette.black,
        surface: palette.surfaceLight,
        onSurface: palette.black,
        surfaceVariant: palette.neutral100Teal,
        onSurfaceVariant: palette.gray,

        outline: palette.neutral200Teal,
        outlineVariant: palette.neutral300Teal,

        error: palette.error,
        onError: '#ffffff',
        errorContainer: palette.errorContainer,
        onErrorContainer: palette.error,
        success: palette.success,
        onSuccess: '#ffffff',
        successContainer: palette.successContainer,
        onSuccessContainer: palette.success,

        action: palette.action,
        onAction: '#ffffff',

        scrim: 'rgba(98, 176, 186, 0.4)',
        inverseSurface: palette.black,
        inverseOnSurface: palette.white,
        inversePrimary: palette.primaryLight,
        trueBlack: palette.trueBlack,
    },
    dark: {
        // React Navigation required
        primary: palette.primary,
        background: palette.backgroundDark,
        card: palette.pureBlack,
        text: palette.white,
        textSecondary: palette.dirtyWhite,
        border: '#354547',
        notification: palette.errorLight,

        // Material Design tokens
        onPrimary: palette.black,
        primaryContainer: palette.primaryDark,
        onPrimaryContainer: palette.primaryLight,

        secondary: palette.secondaryLight,
        onSecondary: palette.black,
        secondaryContainer: palette.secondaryDark,
        onSecondaryContainer: palette.secondaryLight,

        onBackground: palette.white,
        surface: palette.surfaceDark,
        onSurface: palette.white,
        surfaceVariant: '#253638',
        onSurfaceVariant: palette.neutral300,

        outline: '#4a5658',
        outlineVariant: '#5a6668',

        error: palette.errorLight,
        onError: palette.black,
        errorContainer: '#4a2828',
        onErrorContainer: palette.errorLight,
        success: palette.successLight,
        onSuccess: palette.black,
        successContainer: '#1e3a30',
        onSuccessContainer: palette.successLight,

        action: palette.actionLight,
        onAction: palette.black,

        scrim: 'rgba(27, 48, 51, 0.6)',
        inverseSurface: palette.white,
        inverseOnSurface: palette.black,
        inversePrimary: palette.primary,
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
