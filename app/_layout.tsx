import { useInitializeAuth, useTheme } from '@/src/hooks';
import { QueryProvider, StoreProvider } from '@/src/providers';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
        <StoreProvider>
            <QueryProvider>
                <RootLayoutNav />
            </QueryProvider>
        </StoreProvider>
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ThemeProvider value={theme}>
                    <Stack>
                        <Stack.Protected guard={isAuthenticated}>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                            <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
                            <Stack.Screen
                                name="movies/[id]/reviews"
                                options={{ headerShown: false }}
                            />
                        </Stack.Protected>
                        <Stack.Protected guard={!isAuthenticated}>
                            <Stack.Screen name="not-authenticated" />
                        </Stack.Protected>
                    </Stack>
                </ThemeProvider>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
