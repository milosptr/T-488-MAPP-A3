import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { CinemaShowtimes } from '@/src/components/cinema';
import { ImdbIcon, RottenTomatoesIcon } from '@/src/components/icons';
import {
    MovieDetailsList,
    MoviePosterSection,
    MovieStickyHeader,
    ReviewsSummaryCard,
    SkeletonMovie,
} from '@/src/components/movie';
import { TrailerModal } from '@/src/components/trailer';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovie, useMovieShowtimes, useShare, useTheme } from '@/src/hooks';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_SHOW_THRESHOLD = 80;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const MovieScreen = () => {
    const router = useRouter();
    const { colors } = useTheme();
    const { id, cinemaId } = useLocalSearchParams<{ id: string; cinemaId: string }>();
    const { data: movie, isLoading } = useMovie(id as string);
    const { data: showtimes, isLoading: isLoadingShowtimes } = useMovieShowtimes(id, cinemaId);
    const insets = useSafeAreaInsets();
    const { toggleFavoriteStatus } = useFavorites();
    const { shareMovie } = useShare();

    const trailerRef = useRef<BottomSheetModal>(null);
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            scrollY.value,
            [HEADER_SHOW_THRESHOLD - 20, HEADER_SHOW_THRESHOLD + 20],
            [0, 1],
            Extrapolation.CLAMP
        ),
    }));

    const posterButtonsAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            scrollY.value,
            [HEADER_SHOW_THRESHOLD - 20, HEADER_SHOW_THRESHOLD + 20],
            [1, 0],
            Extrapolation.CLAMP
        ),
    }));

    const trailerKey = useMemo(() => {
        if (!movie?.trailers?.length) return null;

        const allResults = movie.trailers.flatMap(t => t.results);

        return (
            allResults.find(r => r.type === 'Trailer')?.key ??
            allResults.find(r => r.name.toLowerCase().includes('trailer'))?.key ??
            allResults[0]?.key ??
            null
        );
    }, [movie]);

    if (!id) {
        return <Redirect href="/+not-found" />;
    }

    if (isLoading) {
        return <SkeletonMovie />;
    }

    if (!movie) {
        return <Redirect href="/+not-found" />;
    }

    const directors = movie.directors_abridged.map(d => ({
        key: d.id ?? d.name,
        value: d.name,
    }));

    const actors = movie.actors_abridged.map(a => ({
        key: a.id ?? a.name,
        value: a.name,
    }));

    const genres = movie.genres.map(g => ({
        key: String(g.ID),
        value: g.NameEN ?? g.Name,
    }));

    const writers =
        movie.omdb?.[0]?.Writer?.split(',').map(w => ({
            key: w.trim(),
            value: w.trim(),
        })) ?? [];

    const omdbCountry = movie.omdb?.[0]?.Country;
    const cinemaName = showtimes?.[0]?.cinema.name;

    return (
        <View style={styles.container}>
            <MovieStickyHeader
                trailerKey={trailerKey}
                movieId={movie._id}
                onBack={() => router.back()}
                onTrailerPress={() => trailerRef.current?.present()}
                onSharePress={() => shareMovie(movie)}
                onFavoritePress={() => toggleFavoriteStatus(movie._id)}
                style={headerAnimatedStyle}
            />
            <AnimatedScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom }}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >
                <MoviePosterSection
                    posterUri={movie.poster}
                    trailerKey={trailerKey}
                    movieId={movie._id}
                    onBack={() => router.back()}
                    onTrailerPress={() => trailerRef.current?.present()}
                    onFavoritePress={() => toggleFavoriteStatus(movie._id)}
                    onSharePress={() => shareMovie(movie)}
                    buttonsAnimatedStyle={posterButtonsAnimatedStyle}
                />
                <View style={styles.content}>
                    <View style={styles.infoDetails}>
                        <Text variant="secondary">{movie.year}</Text>
                        <Text>•</Text>
                        <Text variant="secondary">{movie.durationMinutes} min</Text>
                        {movie.certificate?.number && (
                            <>
                                <Text>•</Text>
                                <Text variant="secondary">PG-{movie.certificate.number}</Text>
                            </>
                        )}
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.title}>{movie.title}</Text>
                        <View style={styles.ratingContainer}>
                            <View style={styles.ratingItem}>
                                <ImdbIcon height={16} width={32} />
                                <Text>
                                    {movie.ratings.imdb ? `${movie.ratings.imdb} / 10` : 'N/A'}
                                </Text>
                            </View>
                            <View style={styles.ratingItem}>
                                <RottenTomatoesIcon height={18} width={20} />
                                <Text>
                                    {movie.ratings.rotten_audience
                                        ? `${movie.ratings.rotten_audience}%`
                                        : 'N/A'}
                                </Text>
                            </View>
                        </View>
                        <Text variant="secondary">{movie.plot}</Text>
                        <MovieDetailsList label="Director" items={directors} />
                        <MovieDetailsList label="Actor" items={actors} />
                        <MovieDetailsList label="Genre" items={genres} />
                        <MovieDetailsList label="Writer" items={writers} />
                        {!!omdbCountry && (
                            <View style={styles.countryContainer}>
                                <Text style={styles.label}>Country of origin:</Text>
                                <Text variant="secondary">{omdbCountry}</Text>
                            </View>
                        )}
                        {cinemaId && (
                            <View style={[styles.showtimesSection, { borderColor: colors.border }]}>
                                <Text style={styles.sectionTitle}>Cinema Showtimes</Text>
                                {cinemaName && (
                                    <Text variant="secondary" style={styles.cinemaName}>
                                        {cinemaName}
                                    </Text>
                                )}
                                <CinemaShowtimes
                                    showtimes={showtimes}
                                    isLoading={isLoadingShowtimes}
                                />
                            </View>
                        )}
                        <ReviewsSummaryCard movieId={movie._id} movieTitle={movie.title} />
                    </View>
                </View>
                <TrailerModal ref={trailerRef} videoKey={trailerKey} />
            </AnimatedScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: spacing.lg,
    },
    infoDetails: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        marginTop: spacing.xl,
        gap: spacing.md,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.lg,
    },
    ratingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    countryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: 'bold',
    },
    showtimesSection: {
        gap: spacing.md,
        borderTopWidth: 1,
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    cinemaName: {
        fontWeight: 'bold',
    },
});
