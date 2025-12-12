import { ASPECT_RATIO, ICON_BUTTON_SIZE } from '@/src/constants/constants';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { getTrailerKey } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { Image, StyleSheet, View, ViewStyle } from 'react-native';
import { LiquidButton, Text } from '../ui';
import { FavoriteButton } from './FavoriteButton';

type Props = {
    movie: Movie;
    showFavoriteButton?: boolean;
    width?: ViewStyle['width'];
    horizontal?: boolean;
    onTrailerPress?: (trailerKey: string) => void;
};

const GRADIENT_HEIGHT = 200;
const TRAILER_BUTTON_SIZE = 60;
const FAVORITE_BUTTON_SIZE = 60;

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
    onTrailerPress,
    width,
    horizontal = false,
}: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage } = useMovieBackdrop(horizontal ? movie?.ids.tmdb : undefined);

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

    const trailerKey = getTrailerKey(movie);

    const rightSpacing = useMemo(() => {
        let right = 0;
        if (showFavoriteButton) {
            right += FAVORITE_BUTTON_SIZE;
        }
        if (onTrailerPress && trailerKey) {
            right += TRAILER_BUTTON_SIZE;
        }
        return right;
    }, [showFavoriteButton, onTrailerPress]);

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
                <View style={styles.bottomRightContainer}>
                    {showFavoriteButton && <FavoriteButton movieId={movie._id} />}
                    {!!onTrailerPress && trailerKey && (
                        <LiquidButton
                            glassEffectStyle="clear"
                            style={styles.trailerButton}
                            leadingIcon={
                                <Ionicons
                                    name="play-circle-outline"
                                    size={24}
                                    color={colors.text}
                                />
                            }
                            onPress={() => onTrailerPress?.(trailerKey ?? '')}
                        />
                    )}
                </View>
                <LinearGradient
                    colors={['transparent', colors.trueBlack]}
                    style={styles.gradient}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 0, y: 1 }}
                />
                <View style={[styles.infoContainer, { right: rightSpacing }]}>
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
        flexShrink: 1,
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
        flexDirection: 'row',
        gap: spacing.sm,
    },
    detailText: {
        fontSize: fontSize.xs,
    },
    trailerButton: {
        paddingHorizontal: 0,
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        borderRadius: borderRadius.full,
    },
});
