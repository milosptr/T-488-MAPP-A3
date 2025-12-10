import { CinemaSection } from '@/src/components/cinema';
import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { SearchBar } from '@/src/components/SearchBar';
import { Text } from '@/src/components/ui';
import { ViewMode, ViewModeToggle } from '@/src/components/ViewModeToggle';
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
import { MovieListEmpty, MovieListItem } from '../components/movie';
import { fontSize, spacing } from '../constants/DesignTokens';
import { CinemaGroup, filterMovies, groupMoviesByCinema, useMovies } from '../hooks';
import { setTitle, useAppDispatch, useAppSelector } from '../store';
import { Movie } from '../types';

const HEADER_HEIGHT = 48;

export const HomeScreen = () => {
    const ref = useRef<LegendListRef>(null);
    const { data = [], isLoading, isRefetching, refetch } = useMovies();
    const [viewMode, setViewMode] = useState<ViewMode>('movies');
    const { width } = useWindowDimensions();
    const cardHeight = (width * 9) / 16 - 32;
    const dispatch = useAppDispatch();
    const filters = useAppSelector(state => state.filters);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [headerWidth, setHeaderWidth] = useState(0);

    const isCinemasView = viewMode === 'cinemas';

    const listData = useMemo(() => {
        const filtered = filterMovies(data, filters);
        if (!isCinemasView) {
            return filtered;
        }
        return groupMoviesByCinema(filtered);
    }, [data, filters, isCinemasView]);

    const handleHeaderLayout = (event: LayoutChangeEvent) => {
        const { width: layoutWidth } = event.nativeEvent.layout;
        if (layoutWidth > 0) {
            setHeaderWidth(layoutWidth);
        }
    };

    const renderItem = ({ item }: LegendListRenderItemProps<Movie | CinemaGroup>) => {
        if (isCinemasView) {
            const group = item as CinemaGroup;
            return <CinemaSection cinema={group.cinema} movies={group.movies} />;
        }
        return <MovieListItem movie={item as Movie} />;
    };

    const keyExtractor = (item: Movie | CinemaGroup) => {
        if (isCinemasView) {
            return String((item as CinemaGroup).cinema.id);
        }
        return (item as Movie)._id;
    };

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
                    <HomeFilters hideCinemas={isCinemasView} onFilterChange={handleFilterChange} />
                </View>
                <ViewModeToggle value={viewMode} onChange={setViewMode} />
            </View>
            <LegendList
                ref={ref}
                data={listData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                recycleItems={true}
                maintainVisibleContentPosition
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                ListEmptyComponent={
                    <MovieListEmpty isLoading={isLoading} cardHeight={cardHeight} />
                }
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
