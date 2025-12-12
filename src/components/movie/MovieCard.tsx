import { ASPECT_RATIO } from '@/src/constants/constants';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { GlassView } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from '../ui';
import { FavoriteButton } from './FavoriteButton';

type Props = {
    movie: Movie;
    showFavoriteButton?: boolean;
    width?: ViewStyle['width'];
    horizontal?: boolean;
};

const GRADIENT_HEIGHT = 200;

const fontSizes = {
    horizontal: {
        title: fontSize.lg,
        detailText: fontSize.sm,
    },
    vertical: {
        title: fontSize.base,
        detailText: fontSize.xs,
    },
};
export const MovieCard = ({
    movie,
    showFavoriteButton = false,
    width,
    horizontal = false,
}: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage } = useMovieBackdrop(horizontal ? movie?.ids.tmdb : undefined);

    const genre = movie?.genres?.map(g => g.NameEN ?? g.Name).at(0);

    const detailTextStyle = {
        ...styles.detailText,
        fontSize: fontSizes[horizontal ? 'horizontal' : 'vertical'].detailText,
    };

    const titleStyle = {
        ...styles.title,
        fontSize: fontSizes[horizontal ? 'horizontal' : 'vertical'].title,
    };

    return (
        <GlassView isInteractive style={styles.container}>
            <View
                style={[
                    styles.posterContainer,
                    {
                        backgroundColor: colors.surface,
                        width,
                        aspectRatio: horizontal ? ASPECT_RATIO.LANDSCAPE : ASPECT_RATIO.POSTER,
                    },
                ]}
            >
                <Image
                    source={{ uri: backdropImage ?? movie?.poster }}
                    resizeMode="cover"
                    style={styles.poster}
                />
                {showFavoriteButton && (
                    <View style={styles.bottomRightContainer}>
                        <FavoriteButton movieId={movie._id} />
                    </View>
                )}
                <LinearGradient
                    colors={['transparent', colors.trueBlack]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }}
                />
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={titleStyle} numberOfLines={2}>
                            {movie?.title}
                        </Text>
                    </View>
                    <View style={styles.infoDetails}>
                        <View style={styles.infoItem}>
                            <Text style={detailTextStyle}>{movie?.year}</Text>
                            <Text style={detailTextStyle}>•</Text>
                            <Text style={detailTextStyle}>{genre}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </GlassView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.md,
    },
    posterContainer: {
        width: '100%',
        borderRadius: borderRadius.md,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    title: {
        fontSize: fontSize.base,
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
        height: GRADIENT_HEIGHT,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        opacity: 0.8,
    },
    bottomRightContainer: {
        position: 'absolute',
        bottom: spacing.sm,
        right: spacing.sm,
        zIndex: 1,
    },
    detailText: {
        fontSize: fontSize.xs,
    },
});
