import { BackButton, CinemaDetailHeader, CinemaDetailSkeleton } from '@/src/components/cinema';
import { MovieCard, MovieListEmpty } from '@/src/components/movie';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useCinema, useMoviesByCinema, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CinemaDetailScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const cinemaId = id ? Number(id) : undefined;
    const {
        data: cinema,
        isLoading: isLoadingCinema,
        refetch: refetchCinema,
    } = useCinema(cinemaId);
    const {
        data: movies = [],
        isLoading: isLoadingMovies,
        refetch: refetchMovies,
        isRefetching,
    } = useMoviesByCinema(cinemaId);

    const isLoading = isLoadingCinema || isLoadingMovies;

    const handleRefresh = () => {
        refetchCinema();
        refetchMovies();
    };

    if (!id) {
        return <Redirect href="/+not-found" />;
    }

    if (isLoading) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <BackButton />
                <CinemaDetailSkeleton />
            </View>
        );
    }

    if (!cinema) {
        return <Redirect href="/+not-found" />;
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <BackButton />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + spacing.xl },
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={handleRefresh}
                        tintColor={colors.primary}
                    />
                }
            >
                <CinemaDetailHeader cinema={cinema} />

                <View style={styles.moviesSection}>
                    <Text style={styles.sectionTitle}>Now Playing</Text>
                    {movies.length === 0 ? (
                        <MovieListEmpty isLoading={false} cardHeight={200} />
                    ) : (
                        <View style={styles.moviesList}>
                            {movies.map((movie: Movie) => (
                                <Pressable
                                    key={movie._id}
                                    onPress={() =>
                                        router.push(`/movies/${movie._id}?cinemaId=${cinemaId}`)
                                    }
                                >
                                    <MovieCard movie={movie} showGenres />
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
    },
    moviesSection: {
        marginTop: spacing.md,
        gap: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    moviesList: {
        gap: spacing.xl,
    },
});
