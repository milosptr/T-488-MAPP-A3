import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaScreen } from '../components/layout';
import { Text } from '../components/ui';

export const MovieScreen = () => {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaScreen>
            <View>
                <Text>{id}</Text>
            </View>
        </SafeAreaScreen>
    );
};
