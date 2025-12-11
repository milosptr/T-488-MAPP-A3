import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
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

type FilterConfig = {
    title: string;
    selected: boolean;
    onClear: () => void;
    Component: React.ComponentType;
};

const filterOrder: Filter[] = ['rating', 'showtime', 'actors', 'directors', 'certificate'];

type Props = {
    onFilterChange?: () => void;
};

export const HomeFilters = ({ onFilterChange }: Props) => {
    const theme = useTheme();
    const ref = useRef<BottomSheetModal>(null);
    const [filter, setFilter] = useState<Filter>('rating');
    const dispatch = useAppDispatch();

    const { rating, showtime, actors, directors, certificate } = useAppSelector(
        state => state.filters
    );

    const filterConfigs: Record<Filter, FilterConfig> = useMemo(
        () => ({
            rating: {
                title: rating?.label ? `Rating: ${rating.label}` : 'Rating',
                selected: !!rating,
                onClear: () => dispatch(setRating(null)),
                Component: RatingFilter,
            },
            showtime: {
                title: showtime?.label ? `Showtime: ${showtime.label}` : 'Showtime',
                selected: !!showtime,
                onClear: () => dispatch(setShowtime(null)),
                Component: ShowtimeFilter,
            },
            actors: {
                title: actors.length > 0 ? `Actors (${actors.length})` : 'Actors',
                selected: actors.length > 0,
                onClear: () => dispatch(setActors([])),
                Component: ActorsFilter,
            },
            directors: {
                title: directors.length > 0 ? `Directors (${directors.length})` : 'Directors',
                selected: directors.length > 0,
                onClear: () => dispatch(setDirectors([])),
                Component: DirectorsFilter,
            },
            certificate: {
                title: certificate ? `PG Rating: ${certificate}` : 'PG Rating',
                selected: !!certificate,
                onClear: () => dispatch(setCertificate(null)),
                Component: CertificateFilter,
            },
        }),
        [rating, showtime, actors, directors, certificate, dispatch]
    );

    const handleOpenFilters = (filterType: Filter) => {
        setFilter(filterType);
        ref.current?.present();
    };

    const handleCloseFilters = () => {
        ref.current?.dismiss();
    };

    const handleChipPress = (filterType: Filter) => {
        const config = filterConfigs[filterType];
        onFilterChange?.();
        if (config.selected) {
            config.onClear();
            return;
        }
        handleOpenFilters(filterType);
    };

    const getChipIcon = (isSelected: boolean) => (
        <Ionicons
            name={isSelected ? 'close' : 'chevron-down'}
            size={16}
            color={theme.colors.text}
        />
    );

    const isScrollableFilter = filter === 'actors' || filter === 'directors';
    const ActiveFilterComponent = filterConfigs[filter].Component;
    const activeFilters = filterOrder.filter(key => filterConfigs[key].selected);

    return (
        <View style={styles.wrapper}>
            <View style={styles.activeFiltersContainer}>
                {activeFilters.length > 0 && (
                    <Text variant="primary" style={styles.activeFiltersText}>
                        {activeFilters.length} active filter{activeFilters.length > 1 ? 's' : ''}
                    </Text>
                )}
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {filterOrder.map(key => {
                    const config = filterConfigs[key];
                    return (
                        <FilterChip
                            key={key}
                            title={config.title}
                            selected={config.selected}
                            onPress={() => handleChipPress(key)}
                            trailingIcon={getChipIcon(config.selected)}
                        />
                    );
                })}
            </ScrollView>
            <BottomSheetModal
                ref={ref}
                enableDynamicSizing={!isScrollableFilter}
                snapPoints={isScrollableFilter ? ['60%', '90%'] : undefined}
                scrollable={isScrollableFilter}
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
