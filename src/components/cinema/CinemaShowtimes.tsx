import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Showtime, ShowtimeSchedule } from '@/src/types';
import { haptics } from '@/src/utils';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../ui';
import { CinemaShowtimesSkeleton } from './CinemaShowtimesSkeleton';

type Props = {
    showtimes: Showtime[] | undefined;
    isLoading: boolean;
};

export const CinemaShowtimes = ({ showtimes, isLoading }: Props) => {
    const { colors } = useTheme();

    const handleShowtimePress = (url: string) => {
        haptics.light();
        Linking.openURL(url);
    };

    if (isLoading) {
        return <CinemaShowtimesSkeleton />;
    }

    if (!showtimes || showtimes.length === 0) {
        return <Text variant="secondary">No showtimes available</Text>;
    }

    return (
        <View style={styles.container}>
            {showtimes.map((showtime: Showtime) =>
                showtime.schedule.map((s: ShowtimeSchedule) => (
                    <Pressable
                        key={s.time}
                        onPress={() => s.purchase_url && handleShowtimePress(s.purchase_url)}
                        style={[
                            styles.showtimeItem,
                            { borderColor: colors.border, backgroundColor: colors.surface },
                        ]}
                    >
                        <Text style={styles.showtimeText}>{s.time}</Text>
                    </Pressable>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    showtimeItem: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
    },
    showtimeText: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
});
