import { spacing } from '@/src/constants/DesignTokens';
import { Showtime, ShowtimeSchedule } from '@/src/types';
import { haptics } from '@/src/utils';
import { Linking, StyleSheet, View } from 'react-native';
import { GlassChip, Text } from '../ui';
import { CinemaShowtimesSkeleton } from './CinemaShowtimesSkeleton';

type Props = {
    showtimes: Showtime[] | undefined;
    isLoading: boolean;
};

const extractTime = (time: string) => {
    const timeOnly = time.replace(/^(\d{1,2}:\d{2}).*$/, '$1').trim();
    return timeOnly ?? time;
};

export const CinemaShowtimes = ({ showtimes, isLoading }: Props) => {
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
                    <GlassChip
                        key={s.time}
                        label={extractTime(s.time)}
                        subtitle={s.info ? s.info : 'English'}
                        onPress={() => s.purchase_url && handleShowtimePress(s.purchase_url)}
                        disabled={!s.purchase_url}
                        style={styles.showtimeItem}
                    />
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        rowGap: spacing.md,
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: '4%',
    },
    showtimeItem: {
        width: '30%',
    },
});
