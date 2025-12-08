import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { Text } from '@/src/components/ui';
import { StyleSheet } from 'react-native';

export const CinemasScreen = () => {
    return (
        <SafeAreaScreen style={styles.container}>
            <Text style={styles.title}>Cinemas</Text>
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
