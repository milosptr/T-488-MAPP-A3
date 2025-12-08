import { Text } from '@/src/components/ui';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export const NotAuthenticatedScreen = () => {
    return (
        <>
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
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});
