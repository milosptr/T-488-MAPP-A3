import { RATING_OPTIONS } from '@/src/constants/constants';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { setRating, useAppDispatch, useAppSelector } from '@/src/store';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ImdbIcon } from '../icons';
import { RottenTomatoesIcon } from '../icons/RottenTomatoesIcon';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

const RatingInfo = ({ imdb, rt }: { imdb: number; rt: number }) => {
    if (imdb === 0) return null;
    return (
        <View style={styles.ratingInfo}>
            <ImdbIcon height={16} width={28} />
            <Text style={styles.imdbText}>{imdb.toFixed(1)}</Text>
            <RottenTomatoesIcon height={16} width={28} />
            <Text style={styles.rtText}>{rt}%</Text>
        </View>
    );
};

export const RatingFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedRating = useAppSelector(state => state.filters.rating);

    const handlePress = (option: (typeof RATING_OPTIONS)[number]) => {
        if (selectedRating?.value === option.value || option.value === 'ANY') {
            dispatch(setRating(null));
        } else {
            dispatch(setRating(option));
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={[styles.header, { borderColor: theme.colors.border }]}>
                    <Text style={styles.title}>Select Rating</Text>
                    {!!selectedRating && (
                        <TouchableOpacity onPress={() => dispatch(setRating(null))}>
                            <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.imdbContainer}>
                    {RATING_OPTIONS.map(option => (
                        <FilterChip
                            key={option.label}
                            title={option.label}
                            trailingIcon={<RatingInfo imdb={option.imdb} rt={option.rt} />}
                            onPress={() => handlePress(option)}
                            selected={
                                selectedRating?.value
                                    ? selectedRating?.value === option.value
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
    imdbContainer: {
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    filterChip: {
        justifyContent: 'space-between',
    },
    imdbText: {
        width: 24,
        textAlign: 'right',
    },
    rtText: {
        width: 48,
    },
    clear: {
        fontSize: fontSize.base,
    },
});
