import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { EmptyFavourites, MovieCard } from '@/src/components/movie';
import { Skeleton, Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovies, useTheme } from '@/src/hooks';
import { setFavoriteOrder, useAppDispatch } from '@/src/store';
import { Movie } from '@/src/types';
import { haptics } from '@/src/utils';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ASPECT_RATIO_LANDSCAPE = 16 / 9;

export const FavouritesScreen = () => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const { favoriteIds } = useFavorites();
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { data: allMovies = [], isLoading } = useMovies();

    const favoriteMovies = useMemo(() => {
        if (!allMovies.length || !favoriteIds.length) return [];

        return favoriteIds
            .map(id => allMovies.find(movie => movie._id === id))
            .filter((movie): movie is Movie => movie !== undefined);
    }, [allMovies, favoriteIds]);

    const handleMoviePress = (movie: Movie) => {
        haptics.light();
        router.push(`/movies/${movie._id}`);
    };

    const handleDragBegin = () => {
        haptics.medium();
    };

    const handleDragEnd = useCallback(
        ({ data }: { data: Movie[] }) => {
            haptics.light();
            const newOrder = data.map(movie => movie._id);
            dispatch(setFavoriteOrder(newOrder));
        },
        [dispatch]
    );

    const renderMovie = ({ item, drag, isActive }: RenderItemParams<Movie>) => (
        <ScaleDecorator>
            <Pressable
                onPress={() => handleMoviePress(item)}
                onLongPress={drag}
                disabled={isActive}
                style={[styles.movieItem, isActive && styles.movieItemActive]}
            >
                <MovieCard movie={item} showFavoriteButton horizontal />
            </Pressable>
        </ScaleDecorator>
    );

    const ItemSeparator = () => <View style={styles.separator} />;

    if (isLoading) {
        return (
            <SafeAreaScreen style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={styles.headerTitle}>Favourites</Text>
                <View style={styles.loadingContainer}>
                    <Skeleton show={true}>
                        <View style={styles.skeletonItem} />
                    </Skeleton>
                    <Skeleton show={true}>
                        <View style={styles.skeletonItem} />
                    </Skeleton>
                </View>
            </SafeAreaScreen>
        );
    }

    return (
        <SafeAreaScreen background edges={['top', 'bottom']} style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Favourites</Text>
                    {favoriteMovies.length > 0 && (
                        <Text variant="secondary">Long press to reorder</Text>
                    )}
                </View>
            </View>
            <DraggableFlatList
                data={favoriteMovies}
                renderItem={renderMovie}
                keyExtractor={item => item._id}
                onDragBegin={handleDragBegin}
                onDragEnd={handleDragEnd}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: bottomInset + spacing.xxl },
                ]}
                ItemSeparatorComponent={ItemSeparator}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyFavourites}
            />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.xl,
    },
    headerTitle: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },
    listContent: {
        flexGrow: 1,
    },
    list: {
        height: '100%',
    },
    movieItem: {
        position: 'relative',
    },
    separator: {
        height: spacing.xxl,
    },
    movieItemActive: {
        opacity: 0.8,
        transform: [{ scale: 1.02 }],
    },
    loadingContainer: {
        padding: spacing.md,
        gap: spacing.lg,
    },
    skeletonItem: {
        width: '100%',
        aspectRatio: ASPECT_RATIO_LANDSCAPE,
        borderRadius: borderRadius.md,
    },
});
