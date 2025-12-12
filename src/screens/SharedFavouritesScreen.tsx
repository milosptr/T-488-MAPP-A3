import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { EmptySharedFavourites, MovieCard } from '@/src/components/movie';
import { LiquidButton, Skeleton, Text } from '@/src/components/ui';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useSharedFavourites, useTheme } from '@/src/hooks';
import type { Movie } from '@/src/types';
import { haptics } from '@/src/utils';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ASPECT_RATIO_LANDSCAPE = 16 / 9;
const BACK_BUTTON_SIZE = 48;

export const SharedFavouritesScreen = () => {
    const { colors } = useTheme();
    const { ids } = useLocalSearchParams<{ ids: string }>();
    const { bottom: bottomInset } = useSafeAreaInsets();
    const { movies, isLoading, error, invalidIds } = useSharedFavourites(ids);

    const handleMoviePress = useCallback((movie: Movie) => {
        haptics.light();
        router.push(`/movies/${movie._id}`);
    }, []);

    const handleBackPress = useCallback(() => {
        haptics.light();
        router.replace('/favourites');
    }, []);

    const renderMovie = useCallback(
        ({ item }: { item: Movie }) => (
            <Pressable onPress={() => handleMoviePress(item)} style={styles.movieItem}>
                <MovieCard movie={item} showFavoriteButton horizontal />
            </Pressable>
        ),
        [handleMoviePress]
    );

    const ItemSeparator = useCallback(() => <View style={styles.separator} />, []);

    const keyExtractor = useCallback((item: Movie) => item._id, []);

    const renderHeader = () => (
        <View style={styles.header}>
            <LiquidButton
                leadingIcon={<Ionicons name="arrow-back" size={24} color={colors.text} />}
                style={styles.backButton}
                onPress={handleBackPress}
            />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerTitle}>Favourites list</Text>
                <Text variant="secondary">Favourites list shared with you</Text>
            </View>
            <View style={styles.backButtonPlaceholder} />
        </View>
    );

    if (isLoading) {
        return (
            <SafeAreaScreen style={styles.container}>
                {renderHeader()}
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

    if (error || movies.length === 0) {
        return (
            <SafeAreaScreen style={styles.container}>
                {renderHeader()}
                <EmptySharedFavourites error={error} invalidCount={invalidIds.length} />
            </SafeAreaScreen>
        );
    }

    return (
        <SafeAreaScreen background edges={['top', 'bottom']} style={styles.container}>
            {renderHeader()}
            {invalidIds.length > 0 && (
                <View style={styles.warningBanner}>
                    <Text variant="danger" style={styles.warningText}>
                        {invalidIds.length} movie{invalidIds.length > 1 ? 's' : ''} could not be
                        found
                    </Text>
                </View>
            )}
            <FlatList
                data={movies}
                renderItem={renderMovie}
                keyExtractor={keyExtractor}
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: bottomInset + spacing.xxl },
                ]}
                ItemSeparatorComponent={ItemSeparator}
                style={styles.list}
                showsVerticalScrollIndicator={false}
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
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
        marginBottom: spacing.xs,
    },
    backButton: {
        width: BACK_BUTTON_SIZE,
        height: BACK_BUTTON_SIZE,
        paddingHorizontal: 0,
        borderRadius: BACK_BUTTON_SIZE,
    },
    backButtonPlaceholder: {
        width: BACK_BUTTON_SIZE,
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
    loadingContainer: {
        padding: spacing.md,
        gap: spacing.lg,
    },
    skeletonItem: {
        width: '100%',
        aspectRatio: ASPECT_RATIO_LANDSCAPE,
        borderRadius: borderRadius.md,
    },
    warningBanner: {
        marginBottom: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    warningText: {
        textAlign: 'center',
    },
});
