import { SHOWTIME_PRESETS } from '@/src/constants/constants';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { setShowtime, useAppDispatch, useAppSelector } from '@/src/store';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

const TimeInfo = ({ start, end }: { start: string; end: string }) => {
    if (start === '00:00' && end === '23:59') return null;
    return (
        <Text style={styles.timeText}>
            {start} - {end}
        </Text>
    );
};

export const ShowtimeFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedShowtime = useAppSelector(state => state.filters.showtime);

    const handlePress = (option: (typeof SHOWTIME_PRESETS)[number]) => {
        if (selectedShowtime?.value === option.value || option.value === 'ANY') {
            dispatch(setShowtime(null));
        } else {
            dispatch(setShowtime(option));
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={[styles.header, { borderColor: theme.colors.border }]}>
                    <Text style={styles.title}>Select Showtime</Text>
                    {!!selectedShowtime && (
                        <TouchableOpacity onPress={() => dispatch(setShowtime(null))}>
                            <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.listContainer}>
                    {SHOWTIME_PRESETS.map(option => (
                        <FilterChip
                            key={option.value}
                            title={option.label}
                            trailingIcon={<TimeInfo start={option.start} end={option.end} />}
                            onPress={() => handlePress(option)}
                            selected={
                                selectedShowtime?.value
                                    ? selectedShowtime?.value === option.value
                                    : option.value === 'ANY'
                            }
                            style={styles.filterChip}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.xl,
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: spacing.xs,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.lg,
    },
    listContainer: {
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    filterChip: {
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: fontSize.sm,
        opacity: 0.7,
    },
    clear: {
        fontSize: fontSize.base,
    },
});
