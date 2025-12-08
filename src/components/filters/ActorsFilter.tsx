import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovies, useTheme } from '@/src/hooks';
import { setActors, useAppDispatch, useAppSelector } from '@/src/store';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useBottomSheetInsets } from '../bottom-sheet';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

export const ActorsFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedActors = useAppSelector(state => state.filters.actors);
    const { data: movies = [] } = useMovies();
    const insets = useBottomSheetInsets();

    const uniqueActors = useMemo(() => {
        const actorsSet = new Set<string>();
        movies.forEach(movie => {
            movie.actors_abridged.forEach(actor => {
                if (actor.name) {
                    actorsSet.add(actor.name);
                }
            });
        });
        return Array.from(actorsSet).sort((a, b) => a.localeCompare(b));
    }, [movies]);

    const handlePress = (actor: string) => {
        if (selectedActors.includes(actor)) {
            dispatch(setActors(selectedActors.filter(a => a !== actor)));
        } else {
            dispatch(setActors([...selectedActors, actor]));
        }
    };

    const handleClear = () => {
        dispatch(setActors([]));
    };

    return (
        <BottomSheetScrollView
            contentContainerStyle={[styles.scrollContent, insets]}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
        >
            <View style={{ backgroundColor: theme.colors.background }}>
                <View style={[styles.header, { borderColor: theme.colors.border }]}>
                    <Text style={styles.title}>Select Actors</Text>
                    {selectedActors.length > 0 && (
                        <TouchableOpacity onPress={handleClear}>
                            <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.listContainer}>
                {uniqueActors.map(actor => (
                    <FilterChip
                        key={actor}
                        title={actor}
                        onPress={() => handlePress(actor)}
                        selected={selectedActors.includes(actor)}
                        hideTrailingIcon
                    />
                ))}
            </View>
        </BottomSheetScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        paddingBottom: spacing.xs,
        paddingTop: spacing.xs,
        marginBottom: spacing.md,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.lg,
    },
    scrollContent: {
        flexGrow: 1,
    },
    listContainer: {
        gap: spacing.sm,
    },
    clear: {
        fontSize: fontSize.base,
    },
});
