import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { ImdbIcon, RottenTomatoesIcon } from '@/src/components/icons';
import { MovieDetailsList, MoviePosterSection, SkeletonMovie } from '@/src/components/movie';
import { MovieReviews } from '@/src/components/movie/MovieReviews';
import { ReviewModal } from '@/src/components/movie/ReviewModal';
import { TrailerModal } from '@/src/components/trailer';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useMovie } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useRef } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MovieScreen = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: movie, isLoading } = useMovie(id as string);
    const insets = useSafeAreaInsets();
    const { toggleFavoriteStatus } = useFavorites();

    const trailerRef = useRef<BottomSheetModal>(null);
    const reviewRef = useRef<BottomSheetModal>(null);
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

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
        >
            <MoviePosterSection
                posterUri={movie.poster}
                trailerKey={trailerKey}
                movieId={movie._id}
                onBack={() => router.back()}
                onTrailerPress={() => trailerRef.current?.present()}
                onFavoritePress={() => toggleFavoriteStatus(movie._id)}
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
                            <Text>{movie.ratings.imdb} / 10</Text>
                        </View>
                        <View style={styles.ratingItem}>
                            <RottenTomatoesIcon height={18} width={20} />
                            <Text>{movie.ratings.rotten_audience}%</Text>
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

                    {/* Action Buttons */}
                    <View style={styles.actionsContainer}>
                        <Pressable
                            style={styles.actionButtonFull}
                            onPress={() => reviewRef.current?.present()}
                        >
                            <Ionicons name="create-outline" size={20} color="#fff" />
                            <Text style={styles.actionButtonText}>Write Review</Text>
                        </Pressable>
                    </View>

                    {/* Reviews Section */}
                    <View style={styles.reviewsSection}>
                        <MovieReviews movieId={movie._id} />
                    </View>
                </View>
            </View>
            <TrailerModal ref={trailerRef} videoKey={trailerKey} />
            <ReviewModal ref={reviewRef} movieId={movie._id} movieTitle={movie.title} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
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
        fontSize: fontSize.xl,
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
    actionsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    actionButtonFull: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        backgroundColor: '#6366F1',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: 12,
    },
    actionButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    reviewsSection: {
        marginTop: spacing.xl,
        paddingTop: spacing.xl,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
});
