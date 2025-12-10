import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ImdbIcon } from '../icons';
import { Skeleton, Text } from '../ui';
import { FavoriteButton } from './FavoriteButton';

type Props = {
    movie: Movie;
    showFavoriteButton?: boolean;
    width?: number;
};

export const MovieCard = ({ movie, showFavoriteButton = false, width }: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage, isLoading } = useMovieBackdrop(movie.ids.tmdb);

    return (
        <Skeleton show={isLoading}>
            <View style={[styles.posterContainer, { backgroundColor: colors.surface, width }]}>
                <Image
                    source={{ uri: backdropImage ?? movie.poster }}
                    resizeMode="contain"
                    style={styles.poster}
                />
                {showFavoriteButton && (
                    <View style={styles.favoriteButton}>
                        <FavoriteButton movieId={movie._id} />
                    </View>
                )}
                <LinearGradient
                    colors={['transparent', colors.surface]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0.3 }}
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
                            <Text>{movie.year}</Text>
                            <Text>•</Text>
                            <Text>{movie.durationMinutes} min</Text>
                        </View>
                        {!!movie.ratings.imdb && (
                            <View style={styles.infoItem}>
                                <ImdbIcon height={16} width={28} />
                                <Text>{movie.ratings.imdb} / 10</Text>
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
        gap: spacing.sm,
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
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: 0.8,
    },
    favoriteButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        zIndex: 1,
    },
});
