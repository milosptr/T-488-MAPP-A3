import { CinemaSection } from '@/src/components/cinema';
import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { SearchBar } from '@/src/components/SearchBar';
import { Text } from '@/src/components/ui';
import { LegendList, LegendListRef, LegendListRenderItemProps } from '@legendapp/list';
import React, { useMemo, useRef, useState } from 'react';
import {
    LayoutChangeEvent,
    RefreshControl,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import { HomeFilters } from '../components/HomeFilters';
import { MovieListEmpty } from '../components/movie';
import { fontSize, spacing } from '../constants/DesignTokens';
import { CinemaGroup, useFilteredMoviesGroupedByCinema, usePrefetchBackdrops } from '../hooks';
import { setTitle, useAppDispatch, useAppSelector } from '../store';

const HEADER_HEIGHT = 48;

export const HomeScreen = () => {
    const ref = useRef<LegendListRef>(null);
    const {
        data: cinemaGroups = [],
        isLoading,
        isRefetching,
        refetch,
    } = useFilteredMoviesGroupedByCinema();
    const allMovies = useMemo(() => cinemaGroups.flatMap(g => g.movies), [cinemaGroups]);
    usePrefetchBackdrops(allMovies);
    const { width } = useWindowDimensions();
    const cardHeight = (width * 9) / 16 - 32;
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [headerWidth, setHeaderWidth] = useState(0);

    const handleHeaderLayout = (event: LayoutChangeEvent) => {
        const { width: layoutWidth } = event.nativeEvent.layout;
        if (layoutWidth > 0) {
            setHeaderWidth(layoutWidth);
        }
    };

    const renderItem = ({ item }: LegendListRenderItemProps<CinemaGroup>) => (
        <CinemaSection cinema={item.cinema} movies={item.movies} />
    );

    const keyExtractor = (item: CinemaGroup) => String(item.cinema.id);

    const handleFilterChange = () => {
        ref.current?.scrollToIndex({ index: 0 });
    };

    return (
        <SafeAreaScreen>
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <View style={styles.titleContainer} onLayout={handleHeaderLayout}>
                        <Text
                            style={[styles.title, searchExpanded && styles.titleHidden]}
                            pointerEvents={searchExpanded ? 'none' : 'auto'}
                        >
                            In cinemas
                        </Text>
                        <SearchBar
                            value={filters.title}
                            onChangeText={text => dispatch(setTitle(text))}
                            placeholder="Search movies..."
                            expanded={searchExpanded}
                            onExpandedChange={setSearchExpanded}
                            containerWidth={headerWidth}
                        />
                    </View>
                    <HomeFilters onFilterChange={handleFilterChange} />
                </View>
            </View>
            <LegendList
                ref={ref}
                data={cinemaGroups}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                recycleItems
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                ListEmptyComponent={
                    <MovieListEmpty isLoading={isLoading} cardHeight={cardHeight} />
                }
                contentContainerStyle={{
                    paddingBottom: spacing.xl,
                }}
            />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: spacing.xl,
        gap: spacing.lg,
    },
    titleSection: {
        gap: spacing.xs,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
        height: HEADER_HEIGHT,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    titleHidden: {
        opacity: 0,
    },
    separator: {
        height: spacing.xxl,
    },
});
