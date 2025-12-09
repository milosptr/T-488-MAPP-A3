import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ImdbIcon } from '../components/icons';
import { RottenTomatoesIcon } from '../components/icons/RottenTomatoesIcon';
import { LiquidButton, Skeleton, Text } from '../components/ui';
import { borderRadius, fontSize, spacing } from '../constants/DesignTokens';
import { useMovie, useTheme } from '../hooks';

export const MovieScreen = () => {
    const router = useRouter();
    const { colors } = useTheme();
    const { id } = useLocalSearchParams();
    const { data: movie, isLoading } = useMovie(id as string);
    const insets = useSafeAreaInsets();

    if (!id) {
        return <Redirect href="/+not-found" />;
    }

    if (isLoading || !movie) {
        return <Skeleton show={isLoading} />;
    }

    const handleBack = () => {
        router.back();
    };

    const omdbWriter = movie.omdb?.[0]?.Writer;
    const omdbCountry = movie.omdb?.[0]?.Country;

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom }}
        >
            <View style={styles.posterContainer}>
                <Image source={{ uri: movie.poster }} style={styles.poster} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', colors.background]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0.1 }}
                    end={{ x: 0, y: 1.3 }}
                />
                <View style={[styles.backButton, { top: insets.top }]}>
                    <LiquidButton
                        style={styles.posterButton}
                        glassEffectStyle="regular"
                        leadingIcon={
                            <Ionicons name="chevron-back-outline" size={24} color={colors.text} />
                        }
                        onPress={handleBack}
                    />
                </View>
                <View style={styles.posterContent}>
                    <LiquidButton
                        leadingIcon={
                            <Ionicons name="play-circle-outline" size={24} color={colors.text} />
                        }
                        text="Trailer"
                    />
                    <View style={{ flex: 1 }} />
                    <LiquidButton
                        style={styles.posterButton}
                        leadingIcon={
                            <Ionicons name="share-outline" size={24} color={colors.text} />
                        }
                    />
                    <LiquidButton
                        style={styles.posterButton}
                        leadingIcon={
                            <Ionicons name="heart-outline" size={24} color={colors.text} />
                        }
                    />
                </View>
            </View>
            <View style={{ padding: spacing.lg }}>
                <View style={styles.infoDetails}>
                    <Text variant="secondary">{movie.year}</Text>
                    <Text>•</Text>
                    <Text variant="secondary">{movie.durationMinutes} min</Text>
                    <Text>•</Text>
                    <Text variant="secondary">PG-{movie.certificate.number}</Text>
                </View>
                <View style={styles.contentContainer}>
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
                    <View style={styles.detailsContainer}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Director{movie.directors_abridged.length > 1 ? 's' : ''}:
                        </Text>
                        {movie.directors_abridged.map((director, index) => (
                            <Fragment key={index}>
                                <Text variant="secondary">{director.name}</Text>
                                {index < movie.directors_abridged.length - 1 ? (
                                    <Text>•</Text>
                                ) : null}
                            </Fragment>
                        ))}
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Actor{movie.actors_abridged.length > 1 ? 's' : ''}:
                        </Text>
                        {movie.actors_abridged.map((actor, index) => (
                            <Fragment key={index}>
                                <Text variant="secondary">{actor.name}</Text>
                                {index < movie.actors_abridged.length - 1 ? <Text>•</Text> : null}
                            </Fragment>
                        ))}
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={{ fontWeight: 'bold' }}>
                            Genre{movie.genres.length > 1 ? 's' : ''}:
                        </Text>
                        {movie.genres.map((genre, index) => (
                            <Fragment key={index}>
                                <Text variant="secondary">{genre.NameEN ?? genre.Name}</Text>
                                {index < movie.genres.length - 1 ? <Text>•</Text> : null}
                            </Fragment>
                        ))}
                    </View>
                    {!!omdbWriter && (
                        <View style={styles.detailsContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Writers:</Text>
                            {omdbWriter.split(',').map((writer, index, arr) => (
                                <Fragment key={index}>
                                    <Text variant="secondary">{writer.trim()}</Text>
                                    {index < arr.length - 1 ? <Text>•</Text> : null}
                                </Fragment>
                            ))}
                        </View>
                    )}
                    {!!omdbCountry && (
                        <View style={styles.detailsContainer}>
                            <Text style={{ fontWeight: 'bold' }}>Country of origin:</Text>
                            <Text variant="secondary">{omdbCountry}</Text>
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    posterContainer: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        aspectRatio: 10 / 16,
        opacity: 0.8,
        marginTop: -48,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    posterContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.lg,
        flexDirection: 'row',
        gap: spacing.md,
    },
    infoDetails: {
        flexDirection: 'row',
        gap: spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
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
    posterButton: {
        borderRadius: 48,
        width: 48,
        paddingHorizontal: 0,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: spacing.lg,
        zIndex: 1,
        borderRadius: 48,
        width: 120,
        paddingHorizontal: 0,
    },
    detailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        flexWrap: 'wrap',
    },
});
