import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useCinemas, useTheme } from '@/src/hooks';
import { setCinemas, useAppDispatch, useAppSelector } from '@/src/store';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useBottomSheetInsets } from '../bottom-sheet';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

export const CinemasFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedCinemas = useAppSelector(state => state.filters.cinemas);
    const { data: cinemas = [] } = useCinemas();
    const insets = useBottomSheetInsets();

    const handlePress = (cinemaId: number) => {
        if (selectedCinemas.includes(cinemaId)) {
            dispatch(setCinemas(selectedCinemas.filter(id => id !== cinemaId)));
        } else {
            dispatch(setCinemas([...selectedCinemas, cinemaId]));
        }
    };

    const handleClear = () => {
        dispatch(setCinemas([]));
    };

    return (
        <BottomSheetScrollView
            contentContainerStyle={[styles.scrollContent, insets]}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
        >
            <View style={{ backgroundColor: theme.colors.background }}>
                <View style={[styles.header, { borderColor: theme.colors.border }]}>
                    <Text style={styles.title}>Select Cinemas</Text>
                    {selectedCinemas.length > 0 && (
                        <TouchableOpacity onPress={handleClear}>
                            <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={styles.listContainer}>
                {cinemas.map(cinema => (
                    <FilterChip
                        key={cinema.id}
                        title={cinema.name}
                        onPress={() => handlePress(cinema.id)}
                        selected={selectedCinemas.includes(cinema.id)}
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
