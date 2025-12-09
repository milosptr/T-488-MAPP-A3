import { MovieCard } from '@/src/components/movie/MovieCard';
import { Skeleton } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovies } from '@/src/hooks';
import { reorderFavorites, useAppDispatch } from '@/src/store';
import { Movie } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { Text } from '@/src/components/ui';
import { useTheme } from '@/src/hooks';

export const FavouritesScreen = () => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const { favoriteIds } = useFavorites();
    const { data: allMovies = [], isLoading } = useMovies();

    // Filter movies to only show favorites
    const favoriteMovies = useMemo(() => {
        if (!allMovies.length || !favoriteIds.length) return [];
        
        // Maintain the order from favoriteIds (user's custom order)
        return favoriteIds
            .map((id) => allMovies.find((movie) => movie._id === id))
            .filter((movie): movie is Movie => movie !== undefined);
    }, [allMovies, favoriteIds]);

    const handleMoviePress = (movie: Movie) => {
        router.push(`/movies/${movie._id}`);
    };

    const handleDragEnd = useCallback(
        ({ data }: { data: Movie[] }) => {
            const newOrder = data.map((movie) => movie._id);
            const oldOrder = favoriteIds;
            
            // Find what moved
            const fromIndex = oldOrder.findIndex((id, i) => id !== newOrder[i]);
            if (fromIndex === -1) return; // No change
            
            const movedId = oldOrder[fromIndex];
            const toIndex = newOrder.indexOf(movedId);
            
            dispatch(reorderFavorites({ from: fromIndex, to: toIndex }));
        },
        [favoriteIds, dispatch]
    );

    const renderMovie = ({ item, drag, isActive }: RenderItemParams<Movie>) => (
        <ScaleDecorator>
            <Pressable
                onPress={() => handleMoviePress(item)}
                onLongPress={drag}
                disabled={isActive}
                style={[
                    styles.movieItem,
                    isActive && styles.movieItemActive,
                ]}
            >
                <MovieCard movie={item} />
                <View style={styles.dragHandle}>
                    <Ionicons name="menu" size={24} color={colors.text} style={{ opacity: 0.5 }} />
                </View>
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaScreen style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Favourites</Text>
                        {favoriteMovies.length > 0 && (
                            <Text style={[styles.headerSubtitle, { color: colors.text, opacity: 0.6 }]}>
                                Long press to reorder
                            </Text>
                        )}
                    </View>
                </View>
                <DraggableFlatList
                    data={favoriteMovies}
                    renderItem={renderMovie}
                    keyExtractor={(item) => item._id}
                    onDragEnd={handleDragEnd}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmpty}
                />
            </SafeAreaScreen>
        </GestureHandlerRootView>
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
        paddingHorizontal: spacing.md,
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        fontSize: 14,
    },
    listContent: {
        padding: spacing.md,
        gap: spacing.lg,
        flexGrow: 1,
    },
    movieItem: {
        marginBottom: spacing.md,
        position: 'relative',
    },
    movieItemActive: {
        opacity: 0.8,
        transform: [{ scale: 1.02 }],
    },
    dragHandle: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: spacing.xs,
        borderRadius: 8,
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
