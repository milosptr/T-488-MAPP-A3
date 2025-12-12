import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Platform } from 'react-native';

export const isGlassAvailable = (): boolean => {
    return Platform.OS === 'ios' && isLiquidGlassAvailable();
};
