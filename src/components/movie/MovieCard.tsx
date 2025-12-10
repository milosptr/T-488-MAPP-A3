import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImdbIcon } from '../icons';
import { LiquidButton, Skeleton, Text } from '../ui';
import { FavoriteButton } from './FavoriteButton';

type Props = {
    movie: Movie;
    showFavoriteButton?: boolean;
    showGenres?: boolean;
    width?: number;
};

export const MovieCard = ({
    movie,
    showFavoriteButton = false,
    showGenres = false,
    width,
}: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage, isLoading } = useMovieBackdrop(movie.ids.tmdb);

    const _showGenres = showGenres && movie.genres.length > 0 && !showFavoriteButton;
    const _showFavoriteButton = showFavoriteButton && !showGenres;

    const genres = movie.genres.map(g => g.NameEN ?? g.Name).slice(0, 2);

    return (
        <Skeleton show={isLoading}>
            <View style={[styles.posterContainer, { backgroundColor: colors.surface, width }]}>
                <Image
                    source={{ uri: backdropImage ?? movie.poster }}
                    resizeMode="contain"
                    style={styles.poster}
                />
                {_showFavoriteButton && (
                    <View style={styles.topRightContainer}>
                        <FavoriteButton movieId={movie._id} />
                    </View>
                )}
                {_showGenres && (
                    <View
                        style={[
                            styles.topRightContainer,
                            { flexDirection: 'row', gap: spacing.sm },
                        ]}
                    >
                        {genres.map((genre, index) => (
                            <LiquidButton
                                key={index}
                                text={genre}
                                style={styles.genreItem}
                                textStyle={styles.ganreText}
                                glassEffectStyle="clear"
                                isInteractive={false}
                            />
                        ))}
                    </View>
                )}
                <LinearGradient
                    colors={['transparent', colors.trueBlack]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }}
                />
                <LinearGradient
                    colors={[colors.trueBlack, 'transparent']}
                    style={styles.topGradient}
                    start={{ x: 0, y: -0.1 }}
                    end={{ x: 0, y: 1 }}
                />
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>
                            {movie.title}
                        </Text>
                    </View>
                    <View style={styles.infoDetails}>
                        <View style={styles.infoItem}>
                            <Text style={styles.detailText}>{movie.year}</Text>
                            <Text style={styles.detailText}>•</Text>
                            <Text style={styles.detailText}>{movie.durationMinutes} min</Text>
                        </View>
                        {!!movie.ratings.imdb && (
                            <View style={[styles.infoItem, { gap: spacing.sm }]}>
                                <ImdbIcon height={14} width={24} />
                                <Text style={styles.detailText}>{movie.ratings.imdb} / 10</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Skeleton>
    );
};

const styles = StyleSheet.create({
    posterContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    title: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
        gap: spacing.xs,
    },
    infoDetails: {
        flexDirection: 'row',
        gap: spacing.md,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
    },
    topGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        opacity: 0.8,
    },
    topRightContainer: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        zIndex: 1,
    },
    genreItem: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
    },
    ganreText: {
        fontSize: fontSize.xs,
    },
    detailText: {
        fontSize: fontSize.sm,
    },
});
