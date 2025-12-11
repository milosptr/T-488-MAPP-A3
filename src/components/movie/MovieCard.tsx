import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Skeleton, Text } from '../ui';
import { FavoriteButton } from './FavoriteButton';

type Props = {
    movie: Movie;
    showFavoriteButton?: boolean;
    width?: ViewStyle['width'];
    horizontal?: boolean;
};

const ASPECT_RATIO_LANDSCAPE = 16 / 9;
const ASPECT_RATIO_POSTER = 1 / 1.53;
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
    const { image: backdropImage, isLoading } = useMovieBackdrop(
        horizontal ? movie?.ids.tmdb : undefined
    );

    const genre = movie?.genres?.map(g => g.NameEN ?? g.Name).at(0);

    const detailTextStyle = useMemo(() => {
        return {
            ...styles.detailText,
            fontSize: fontSizes[horizontal ? 'horizontal' : 'vertical'].detailText,
        };
    }, [horizontal]);

    const titleStyle = useMemo(() => {
        return {
            ...styles.title,
            fontSize: fontSizes[horizontal ? 'horizontal' : 'vertical'].title,
        };
    }, [horizontal]);

    return (
        <Skeleton show={isLoading}>
            <View
                style={[
                    styles.posterContainer,
                    {
                        backgroundColor: colors.surface,
                        width,
                        aspectRatio: horizontal ? ASPECT_RATIO_LANDSCAPE : ASPECT_RATIO_POSTER,
                    },
                ]}
            >
                <Image
                    source={{ uri: backdropImage ?? movie?.poster }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    recyclingKey={movie._id}
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
        </Skeleton>
    );
};

const styles = StyleSheet.create({
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
