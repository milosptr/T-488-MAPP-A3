import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Showtime, ShowtimeSchedule } from '@/src/types';
import { ExternalPathString, Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from '../ui';

type Props = {
    showtimes: Showtime[] | undefined;
    isLoading: boolean;
};

export const CinemaShowtimes = ({ showtimes, isLoading }: Props) => {
    const { colors } = useTheme();

    if (isLoading) {
        return <Text variant="secondary">Loading showtimes...</Text>;
    }

    if (!showtimes || showtimes.length === 0) {
        return <Text variant="secondary">No showtimes available</Text>;
    }

    return (
        <View style={styles.container}>
            {showtimes.map((showtime: Showtime) =>
                showtime.schedule.map((s: ShowtimeSchedule) => (
                    <Link
                        key={s.time}
                        href={`${s.purchase_url as ExternalPathString}`}
                        style={[
                            styles.showtimeItem,
                            { borderColor: colors.border, backgroundColor: colors.surface },
                        ]}
                    >
                        <Text style={styles.showtimeText}>{s.time}</Text>
                    </Link>
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
