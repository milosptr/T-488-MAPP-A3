import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { usePrefetchAppData } from '@/src/hooks/api';

type Props = {
    onComplete?: () => void;
};

const APP_NAME = 'Dr. Cinema';
const SUBTITLE = 'Icelandic Cinema';
const GRADIENT_TOP = '#1B3033';
const GRADIENT_BOTTOM = '#000000';

const TIMING = {
    total: 2500,
    gradientDuration: 1500,
    textStart: 500,
    textDuration: 1000,
    fadeStart: 2000,
    fadeDuration: 500,
} as const;

const EASING = Easing.bezier(0.33, 0, 0.67, 1);
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const useGradientAnimation = (duration: number) => {
    const [endY, setEndY] = useState(0);
    const startTimeRef = useRef(0);
    const rafRef = useRef(0);

    useEffect(() => {
        const animate = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;

            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
            setEndY(easeOutCubic(progress));

            if (progress < 1) {
                rafRef.current = global.requestAnimationFrame(animate);
            }
        };

        rafRef.current = global.requestAnimationFrame(animate);
        return () => global.cancelAnimationFrame(rafRef.current);
    }, [duration]);

    return endY;
};

export const SplashScreen = ({ onComplete }: Props) => {
    const gradientEndY = useGradientAnimation(TIMING.gradientDuration);

    usePrefetchAppData();

    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(10);
    const screenOpacity = useSharedValue(1);

    const animateScreen = () => {
        textOpacity.value = withDelay(
            TIMING.textStart,
            withTiming(1, { duration: TIMING.textDuration, easing: EASING })
        );

        textTranslateY.value = withDelay(
            TIMING.textStart,
            withTiming(0, { duration: TIMING.textDuration, easing: Easing.out(Easing.cubic) })
        );

        screenOpacity.value = withDelay(
            TIMING.fadeStart,
            withTiming(0, { duration: TIMING.fadeDuration, easing: EASING })
        );
    };

    useEffect(() => {
        animateScreen();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => onComplete?.(), TIMING.total);
        return () => clearTimeout(timeout);
    }, [onComplete]);

    const textStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    const containerStyle = useAnimatedStyle(() => ({
        opacity: screenOpacity.value,
    }));

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            <LinearGradient
                colors={[GRADIENT_TOP, GRADIENT_BOTTOM]}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: gradientEndY || 0.001 }}
            />
            <View style={styles.content}>
                <Animated.View style={[styles.textContainer, textStyle]}>
                    <Text style={styles.appName}>{APP_NAME}</Text>
                    <Text style={styles.subtitle}>{SUBTITLE}</Text>
                </Animated.View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GRADIENT_BOTTOM,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    appName: {
        fontSize: fontSize.xxl + 8,
        fontWeight: '600',
        letterSpacing: 3,
        color: '#ffffff',
    },
    subtitle: {
        fontSize: fontSize.base,
        fontWeight: '400',
        letterSpacing: 2,
        color: 'rgba(255, 255, 255, 0.7)',
        marginTop: spacing.sm,
    },
});
