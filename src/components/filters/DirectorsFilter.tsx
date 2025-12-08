import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovies, useTheme } from '@/src/hooks';
import { setDirectors, useAppDispatch, useAppSelector } from '@/src/store';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useBottomSheetInsets } from '../bottom-sheet';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

export const DirectorsFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedDirectors = useAppSelector(state => state.filters.directors);
    const { data: movies = [] } = useMovies();
    const insets = useBottomSheetInsets();

    const uniqueDirectors = useMemo(() => {
        const directorsSet = new Set<string>();
        movies.forEach(movie => {
            movie.directors_abridged.forEach(director => {
                if (director.name) {
                    directorsSet.add(director.name);
                }
            });
        });
        return Array.from(directorsSet).sort((a, b) => a.localeCompare(b));
    }, [movies]);

    const handlePress = (director: string) => {
        if (selectedDirectors.includes(director)) {
            dispatch(setDirectors(selectedDirectors.filter(d => d !== director)));
        } else {
            dispatch(setDirectors([...selectedDirectors, director]));
        }
    };

    const handleClear = () => {
        dispatch(setDirectors([]));
    };

    return (
        <BottomSheetScrollView
            contentContainerStyle={[styles.scrollContent, insets]}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
        >
            <View style={{ backgroundColor: theme.colors.background }}>
                <View style={[styles.header, { borderColor: theme.colors.border }]}>
                    <Text style={styles.title}>Select Directors</Text>
                    {selectedDirectors.length > 0 && (
                        <TouchableOpacity onPress={handleClear}>
                            <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.listContainer}>
                {uniqueDirectors.map(director => (
                    <FilterChip
                        key={director}
                        title={director}
                        onPress={() => handlePress(director)}
                        selected={selectedDirectors.includes(director)}
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
