import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export const Background = () => {
    return (
        <LinearGradient
            colors={['#1B3033', '#000000']}
            style={StyleSheet.absoluteFillObject}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        />
    );
};
