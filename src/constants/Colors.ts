import { fonts } from './fonts';

const palette = {
    // Primary - Teal
    primary: '#62b0ba',
    primaryLight: '#89c5cd',
    primaryDark: '#4a8f97',

    // Secondary - Coral/Orange
    secondary: '#f2623d',
    secondaryLight: '#f58468',
    secondaryDark: '#d44a28',

    // Neutrals (cool-tinted to harmonize with teal)
    white: '#f2f2f2',
    gray: '#7a7f82',
    black: '#1e2022',

    // Dark theme backgrounds
    backgroundDark: '#141820',
    surfaceDark: '#1e2430', // 5% lighter than backgroundDark

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
        background: palette.white,
        card: '#ffffff',
        text: palette.black,
        border: palette.neutral200,
        notification: palette.error,

        // Material Design tokens
        onPrimary: '#ffffff',
        primaryContainer: '#d4eef1',
        onPrimaryContainer: palette.primaryDark,

        secondary: palette.secondary,
        onSecondary: '#ffffff',
        secondaryContainer: '#fde0d9',
        onSecondaryContainer: palette.secondaryDark,

        onBackground: palette.black,
        surface: '#ffffff',
        onSurface: palette.black,
        surfaceVariant: palette.neutral100,
        onSurfaceVariant: palette.gray,

        outline: palette.neutral200,
        outlineVariant: palette.neutral300,

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

        scrim: 'rgba(98, 176, 186, 0.5)',
        inverseSurface: palette.black,
        inverseOnSurface: palette.white,
        inversePrimary: palette.primaryLight,
    },
    dark: {
        // React Navigation required
        primary: palette.primaryLight,
        background: palette.backgroundDark,
        card: palette.surfaceDark,
        text: palette.white,
        border: '#2a3040',
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
        surfaceVariant: '#2a3040',
        onSurfaceVariant: palette.neutral300,

        outline: '#5a6064',
        outlineVariant: '#6a7074',

        error: palette.errorLight,
        onError: palette.black,
        errorContainer: '#5c2828',
        onErrorContainer: palette.errorLight,
        success: palette.successLight,
        onSuccess: palette.black,
        successContainer: '#2a4a32',
        onSuccessContainer: palette.successLight,

        action: palette.actionLight,
        onAction: palette.black,

        scrim: 'rgba(98, 176, 186, 0.2)',
        inverseSurface: palette.white,
        inverseOnSurface: palette.black,
        inversePrimary: palette.primary,
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
