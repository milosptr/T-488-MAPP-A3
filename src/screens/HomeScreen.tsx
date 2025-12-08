import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { SearchBar } from '@/src/components/SearchBar';
import { Skeleton, Text } from '@/src/components/ui';
import { LegendList, LegendListRef, LegendListRenderItemProps } from '@legendapp/list';
import { Link, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Image,
    LayoutChangeEvent,
    Platform,
    RefreshControl,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import { HomeFilters } from '../components/HomeFilters';
import { MovieCard } from '../components/movie';
import { borderRadius, fontSize, spacing } from '../constants/DesignTokens';
import { useFilteredMovies, useMovies } from '../hooks';
import { setTitle, useAppDispatch, useAppSelector } from '../store';
import { Movie } from '../types';

export const HomeScreen = () => {
    const ref = useRef<LegendListRef>(null);
    const router = useRouter();
    const { data = [], isLoading, isRefetching, refetch } = useMovies();
    const { width } = useWindowDimensions();
    const cardHeight = (width * 9) / 16 - 32;

    const dispatch = useAppDispatch();
    const searchTitle = useAppSelector(state => state.filters.title);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [headerWidth, setHeaderWidth] = useState(0);

    const filteredData = useFilteredMovies(data);

    const handleHeaderLayout = (event: LayoutChangeEvent) => {
        const { width: layoutWidth } = event.nativeEvent.layout;
        if (layoutWidth > 0) {
            setHeaderWidth(layoutWidth);
        }
    };

    const renderItem = ({ item }: LegendListRenderItemProps<Movie>) => {
        if (Platform.OS === 'android') {
            return (
                <Link href={`/movies/${item._id}`}>
                    <MovieCard movie={item} />
                </Link>
            );
        }

        return (
            <Link href={`/movies/${item._id}`}>
                <Link.Trigger>
                    <MovieCard movie={item} />
                </Link.Trigger>
                <Link.Preview>
                    <Image
                        source={{ uri: item.poster }}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                            borderRadius: borderRadius.md,
                        }}
                    />
                </Link.Preview>
                <Link.Menu>
                    <Link.MenuAction
                        title="Open"
                        icon="eye"
                        onPress={() => router.push(`/movies/${item._id}`)}
                    />
                    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={() => {}} />
                    <Link.MenuAction title="Add to favourites" icon="heart" onPress={() => {}} />
                </Link.Menu>
            </Link>
        );
    };

    const handleFilterChange = () => {
        ref.current?.scrollToIndex({ index: 0 });
    };

    const renderEmptyComponent = () => {
        if (isLoading) {
            return (
                <View style={{ gap: spacing.xl }}>
                    <Skeleton show={true} width={'100%'} height={cardHeight} />
                    <Skeleton show={true} width={'100%'} height={cardHeight} />
                    <Skeleton show={true} width={'100%'} height={cardHeight} />
                </View>
            );
        }
        return <Text>No movies found</Text>;
    };

    return (
        <SafeAreaScreen>
            <View style={styles.header}>
                <View style={styles.titleContainer} onLayout={handleHeaderLayout}>
                    <Text
                        style={[styles.title, searchExpanded && styles.titleHidden]}
                        pointerEvents={searchExpanded ? 'none' : 'auto'}
                    >
                        In cinemas
                    </Text>
                    <SearchBar
                        value={searchTitle}
                        onChangeText={text => dispatch(setTitle(text))}
                        placeholder="Search movies..."
                        expanded={searchExpanded}
                        onExpandedChange={setSearchExpanded}
                        containerWidth={headerWidth}
                    />
                </View>
                <HomeFilters onFilterChange={handleFilterChange} />
            </View>
            <LegendList
                ref={ref}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                recycleItems={true}
                maintainVisibleContentPosition
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                ListEmptyComponent={renderEmptyComponent()}
            />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: spacing.xl,
        gap: spacing.md,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
        height: 48,
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
