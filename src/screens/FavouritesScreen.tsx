import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { MovieCard } from '@/src/components/movie/MovieCard';
import { Skeleton, Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovies, useTheme } from '@/src/hooks';
import { setFavoriteOrder, useAppDispatch } from '@/src/store';
import { Movie } from '@/src/types';
import { haptics } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
                <MovieCard movie={item} showFavoriteButton />
            </Pressable>
        </ScaleDecorator>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color={colors.text} style={{ opacity: 0.3 }} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>No favorites yet</Text>
            <Text style={[styles.emptySubtitle, { color: colors.text, opacity: 0.6 }]}>
                Tap the heart icon on any movie to add it to your favorites
            </Text>
        </View>
    );

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
        <SafeAreaScreen
            edges={['top', 'bottom']}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
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
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={{ height: '100%' }}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmpty}
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
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
    },
    loadingContainer: {
        padding: spacing.md,
        gap: spacing.lg,
    },
    skeletonItem: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 12,
    },
});
