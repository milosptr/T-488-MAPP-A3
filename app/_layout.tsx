import { useInitializeAuth, useTheme } from '@/src/hooks';
import { QueryProvider } from '@/src/providers';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (fontError) throw fontError;
    }, [fontError]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QueryProvider>
            <RootLayoutNav />
        </QueryProvider>
    );
}

function RootLayoutNav() {
    const theme = useTheme();
    const { isLoading, isAuthenticated } = useInitializeAuth();

    useEffect(() => {
        if (!isLoading) {
            SplashScreen.hideAsync();
        }
    }, [isLoading]);

    if (isLoading) {
        return null;
    }

    return (
        <ThemeProvider value={theme}>
            <Stack>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                </Stack.Protected>
                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="not-authenticated" />
                </Stack.Protected>
            </Stack>
        </ThemeProvider>
    );
}
