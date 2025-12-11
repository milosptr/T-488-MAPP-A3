import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaScreen } from '../components/layout';

export const NotAuthenticatedScreen = () => {
    return (
        <SafeAreaScreen>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>You are not authenticated.</Text>
                <Text style={styles.text}>
                    Did you forget to add your credentials to the .env file? Look at the
                    .env.example file for more information.
                </Text>
                <Text style={styles.text}>
                    If you don't have credentials, please register at https://api.kvikmyndir.is/,
                    add the login credentials to the .env file and restart the app.
                </Text>
            </View>
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        gap: spacing.sm,
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    text: {
        fontSize: fontSize.base,
        textAlign: 'center',
    },
});
