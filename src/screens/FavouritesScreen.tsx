import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { EmptyFavourites, MovieCard } from '@/src/components/movie';
import { LiquidButton, Skeleton, Text } from '@/src/components/ui';
import { ASPECT_RATIO, ICON_BUTTON_SIZE } from '@/src/constants/constants';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovies, useShare, useTheme, useUpcoming } from '@/src/hooks';
import { saveFavorites, setFavoriteOrder, useAppDispatch } from '@/src/store';
import { FavoriteMovie, Movie, UpcomingMovie } from '@/src/types';
import { haptics } from '@/src/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from 'react-native-draggable-flatlist';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { formatReleaseDate } from '../utils';

export const FavouritesScreen = () => {
    const { colors } = useTheme();
    const dispatch = useAppDispatch();
    const { favoriteIds } = useFavorites();
    const { shareFavourites } = useShare();
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { data: allMovies = [], isLoading } = useMovies();
    const { data: upcomingMovies = [], isLoading: isLoadingUpcoming } = useUpcoming();

    const favoriteMovies: FavoriteMovie[] = useMemo(() => {
        if (!allMovies.length || !favoriteIds.length) return [];

        const favoriteMovies = favoriteIds
            .map(id => allMovies.find(movie => movie._id === id))
            .filter((movie): movie is Movie => movie !== undefined)
            .map(movie => ({
                ...movie,
                type: 'movie',
            })) as FavoriteMovie[];

        const favoriteUpcomingMovies = favoriteIds
            .map(id => upcomingMovies.find(movie => String(movie._id) === id))
            .filter((movie): movie is UpcomingMovie => movie !== undefined)
            .map(movie => ({
                ...movie,
                year: formatReleaseDate(movie['release-dateIS']),
                showtimes: [],
                type: 'upcoming',
            })) as FavoriteMovie[];

        return [...favoriteMovies, ...favoriteUpcomingMovies];
    }, [allMovies, favoriteIds, upcomingMovies]);

    const handleMoviePress = (movie: FavoriteMovie) => {
        if (movie.type === 'upcoming') {
            haptics.light();
            Alert.alert(
                'Coming soon',
                `No preview available for upcoming movies. This movie will be available on ${movie.year}`
            );
            return;
        }
        haptics.light();
        router.push(`/movies/${movie._id}`);
    };

    const handleSharePress = useCallback(() => {
        haptics.light();
        shareFavourites(favoriteIds);
    }, [favoriteIds, shareFavourites]);

    const handleDragBegin = () => {
        haptics.medium();
    };

    const handleDragEnd = useCallback(
        ({ data }: { data: FavoriteMovie[] }) => {
            haptics.light();
            const newOrder = data.map(movie => movie._id);
            dispatch(setFavoriteOrder(newOrder));
            saveFavorites(newOrder);
        },
        [dispatch]
    );

    const renderMovie = ({ item, drag, isActive }: RenderItemParams<FavoriteMovie>) => (
        <ScaleDecorator>
            <Pressable
                onPress={() => handleMoviePress(item)}
                onLongPress={drag}
                disabled={isActive}
                style={[styles.movieItem, isActive && styles.movieItemActive]}
            >
                <MovieCard movie={item as Movie} showFavoriteButton horizontal />
            </Pressable>
        </ScaleDecorator>
    );

    const ItemSeparator = () => <View style={styles.separator} />;

    if (isLoading || isLoadingUpcoming) {
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
                {favoriteMovies.length > 0 && (
                    <LiquidButton
                        leadingIcon={
                            <Ionicons name="share-outline" size={24} color={colors.text} />
                        }
                        style={styles.shareButton}
                        onPress={handleSharePress}
                    />
                )}
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
        aspectRatio: ASPECT_RATIO.LANDSCAPE,
        borderRadius: borderRadius.md,
    },
    shareButton: {
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        paddingHorizontal: 0,
        borderRadius: borderRadius.full,
    },
});
