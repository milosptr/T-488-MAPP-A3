import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieShowtimes, useTheme } from '@/src/hooks';
import { Showtime, ShowtimeSchedule } from '@/src/types';
import { ExternalPathString, Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from '../ui';

type Props = {
    cinemaId: string;
    movieId: string;
};

export const CinemaShowtimes = ({ cinemaId, movieId }: Props) => {
    const { colors } = useTheme();
    const { data: showtimes, isLoading } = useMovieShowtimes(movieId, cinemaId);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { borderColor: colors.border }]}>
            <Text style={styles.title}>Cinema Showtimes</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                {showtimes?.[0]?.cinema.name}
            </Text>
            <View style={styles.showtimesContainer}>
                {showtimes?.map((showtime: Showtime) =>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
        borderTopWidth: 1,
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
    },
    title: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    showtimesContainer: {
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
    subtitle: {
        fontSize: fontSize.base,
        fontWeight: 'bold',
    },
});
