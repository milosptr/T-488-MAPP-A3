import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SafeAreaScreen } from '../components/layout';

export const NotFoundScreen = () => {
    const { colors } = useTheme();

    return (
        <SafeAreaScreen>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View style={styles.container}>
                <Text style={styles.title}>This screen doesn't exist.</Text>

                <Link href="/" style={styles.link}>
                    <Text style={[styles.linkText, { color: colors.action }]}>
                        Go to home screen!
                    </Text>
                </Link>
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
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    link: {
        marginTop: spacing.lg,
        paddingVertical: spacing.lg,
    },
    linkText: {
        fontSize: fontSize.sm,
    },
});
