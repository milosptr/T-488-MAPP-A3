import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { fontSize, spacing } from '../constants/DesignTokens';
import {
    setActors,
    setCertificate,
    setDirectors,
    setRating,
    setShowtime,
    useAppDispatch,
    useAppSelector,
} from '../store';
import { BottomSheetModal } from './bottom-sheet/BottomSheetModal';
import {
    ActorsFilter,
    CertificateFilter,
    DirectorsFilter,
    RatingFilter,
    ShowtimeFilter,
} from './filters';
import { Text } from './ui';
import { FilterChip } from './ui/FilterChip';

type Filter = 'rating' | 'showtime' | 'actors' | 'directors' | 'certificate';

type StaticFilterConfig = {
    key: Filter;
    baseTitle: string;
    Component: React.ComponentType;
    isScrollable: boolean;
};

const FILTER_CONFIGS: StaticFilterConfig[] = [
    { key: 'rating', baseTitle: 'Rating', Component: RatingFilter, isScrollable: false },
    { key: 'showtime', baseTitle: 'Showtime', Component: ShowtimeFilter, isScrollable: false },
    { key: 'actors', baseTitle: 'Actors', Component: ActorsFilter, isScrollable: true },
    { key: 'directors', baseTitle: 'Directors', Component: DirectorsFilter, isScrollable: true },
    {
        key: 'certificate',
        baseTitle: 'PG Rating',
        Component: CertificateFilter,
        isScrollable: false,
    },
];

type Props = {
    onFilterChange?: () => void;
};

export const HomeFilters = ({ onFilterChange }: Props) => {
    const theme = useTheme();
    const ref = useRef<BottomSheetModal>(null);
    const [activeFilter, setActiveFilter] = useState<Filter>('rating');
    const dispatch = useAppDispatch();

    const { rating, showtime, actors, directors, certificate } = useAppSelector(
        state => state.filters
    );

    const getFilterState = useCallback(
        (key: Filter) => {
            switch (key) {
                case 'rating':
                    return {
                        title: rating?.label ? `Rating: ${rating.label}` : 'Rating',
                        selected: !!rating,
                    };
                case 'showtime':
                    return {
                        title: showtime?.label ? `Showtime: ${showtime.label}` : 'Showtime',
                        selected: !!showtime,
                    };
                case 'actors':
                    return {
                        title: actors.length > 0 ? `Actors (${actors.length})` : 'Actors',
                        selected: actors.length > 0,
                    };
                case 'directors':
                    return {
                        title:
                            directors.length > 0 ? `Directors (${directors.length})` : 'Directors',
                        selected: directors.length > 0,
                    };
                case 'certificate':
                    return {
                        title: certificate ? `PG Rating: ${certificate}` : 'PG Rating',
                        selected: !!certificate,
                    };
            }
        },
        [rating, showtime, actors, directors, certificate]
    );

    const clearFilter = useCallback(
        (key: Filter) => {
            switch (key) {
                case 'rating':
                    dispatch(setRating(null));
                    break;
                case 'showtime':
                    dispatch(setShowtime(null));
                    break;
                case 'actors':
                    dispatch(setActors([]));
                    break;
                case 'directors':
                    dispatch(setDirectors([]));
                    break;
                case 'certificate':
                    dispatch(setCertificate(null));
                    break;
            }
        },
        [dispatch]
    );

    const handleOpenFilters = useCallback((filterType: Filter) => {
        setActiveFilter(filterType);
        ref.current?.present();
    }, []);

    const handleCloseFilters = useCallback(() => {
        ref.current?.dismiss();
    }, []);

    const handleChipPress = useCallback(
        (filterType: Filter) => {
            onFilterChange?.();
            const state = getFilterState(filterType);
            if (state.selected) {
                clearFilter(filterType);
                return;
            }
            handleOpenFilters(filterType);
        },
        [onFilterChange, getFilterState, clearFilter, handleOpenFilters]
    );

    const getChipIcon = useCallback(
        (isSelected: boolean) => (
            <Ionicons
                name={isSelected ? 'close' : 'chevron-down'}
                size={16}
                color={theme.colors.text}
            />
        ),
        [theme.colors.text]
    );

    const activeFilterConfig = useMemo(
        () => FILTER_CONFIGS.find(c => c.key === activeFilter)!,
        [activeFilter]
    );

    const activeFilterCount = useMemo(() => {
        return FILTER_CONFIGS.filter(config => getFilterState(config.key).selected).length;
    }, [getFilterState]);

    const ActiveFilterComponent = activeFilterConfig.Component;

    return (
        <View style={styles.wrapper}>
            <View style={styles.activeFiltersContainer}>
                {activeFilterCount > 0 && (
                    <Text variant="primary" style={styles.activeFiltersText}>
                        {activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''}
                    </Text>
                )}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {FILTER_CONFIGS.map(config => {
                    const state = getFilterState(config.key);
                    return (
                        <FilterChip
                            key={config.key}
                            title={state.title}
                            selected={state.selected}
                            onPress={() => handleChipPress(config.key)}
                            trailingIcon={getChipIcon(state.selected)}
                        />
                    );
                })}
            </ScrollView>
            <BottomSheetModal
                ref={ref}
                enableDynamicSizing={!activeFilterConfig.isScrollable}
                snapPoints={activeFilterConfig.isScrollable ? ['60%', '90%'] : undefined}
                scrollable={activeFilterConfig.isScrollable}
                onDismiss={handleCloseFilters}
            >
                <ActiveFilterComponent />
            </BottomSheetModal>
        </View>
    );
};

const ACTIVE_FILTERS_HEIGHT = 20;

const styles = StyleSheet.create({
    wrapper: {
        gap: spacing.xs,
    },
    activeFiltersContainer: {
        height: ACTIVE_FILTERS_HEIGHT,
    },
    activeFiltersText: {
        fontSize: fontSize.sm,
    },
    container: {
        flexDirection: 'row',
        gap: spacing.md,
    },
});
