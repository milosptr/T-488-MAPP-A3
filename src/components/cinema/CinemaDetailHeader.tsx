import { Text } from '@/src/components/ui';
import { fontSize, lineHeight, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Cinema } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
    cinema: Cinema;
};

const ICON_SIZE = 20;

export const CinemaDetailHeader = ({ cinema }: Props) => {
    const { colors } = useTheme();

    const handlePhonePress = () => {
        Linking.openURL(`tel:${cinema.phone}`);
    };

    const handleWebsitePress = () => {
        const url = cinema.website.startsWith('http')
            ? cinema.website
            : `https://${cinema.website}`;
        Linking.openURL(url);
    };

    const fullAddress = `${cinema.address}, ${cinema.city}`;

    const handleAddressPress = () => {
        Linking.openURL(`https://maps.google.com/?q=${fullAddress}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{cinema.name}</Text>

            {cinema.description && (
                <Text variant="secondary" style={styles.description}>
                    {cinema.description}
                </Text>
            )}

            {!!cinema.description && (
                <View style={[styles.divider, { backgroundColor: colors.border }]} />
            )}

            <View style={styles.infoSection}>
                {!!cinema.address && (
                    <TouchableOpacity style={styles.infoRow} onPress={handleAddressPress}>
                        <Ionicons name="location-outline" size={ICON_SIZE} color={colors.primary} />
                        <Text variant="primary" style={styles.infoText}>
                            {fullAddress}
                        </Text>
                    </TouchableOpacity>
                )}
                {!!cinema.phone && (
                    <TouchableOpacity style={styles.infoRow} onPress={handlePhonePress}>
                        <Ionicons name="call-outline" size={ICON_SIZE} color={colors.primary} />
                        <Text variant="primary" style={styles.infoText}>
                            {cinema.phone}
                        </Text>
                    </TouchableOpacity>
                )}

                {!!cinema.website && (
                    <TouchableOpacity style={styles.infoRow} onPress={handleWebsitePress}>
                        <Ionicons name="globe-outline" size={ICON_SIZE} color={colors.primary} />
                        <Text variant="primary" style={styles.infoText}>
                            {cinema.website}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    name: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    description: {
        lineHeight: fontSize.base * lineHeight.normal,
    },
    divider: {
        height: 1,
        marginVertical: spacing.sm,
    },
    infoSection: {
        gap: spacing.md,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    infoText: {
        flex: 1,
    },
});
