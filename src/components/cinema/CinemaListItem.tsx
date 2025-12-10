import { Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Cinema } from '@/src/types';
import { haptics } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
    cinema: Cinema;
};

const ICON_SIZE = 24;
const CHEVRON_SIZE = 20;
const ICON_CONTAINER_SIZE = 48;

export const CinemaListItem = ({ cinema }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();

    const handleNavigate = () => {
        haptics.light();
        router.push(`/cinemas/${cinema.id}`);
    };

    return (
        <Pressable
            onPress={handleNavigate}
            style={({ pressed }) => [
                styles.container,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
        >
            <View style={[styles.iconContainer, { backgroundColor: colors.surfaceVariant }]}>
                <Ionicons name="film-outline" size={ICON_SIZE} color={colors.primary} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1}>
                    {cinema.name}
                </Text>
                <Text variant="secondary" style={styles.website} numberOfLines={1}>
                    {cinema.website}
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textSecondary} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        gap: spacing.lg,
    },
    iconContainer: {
        width: ICON_CONTAINER_SIZE,
        height: ICON_CONTAINER_SIZE,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        flex: 1,
        gap: spacing.xs,
    },
    name: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    website: {
        fontSize: fontSize.sm,
    },
});
