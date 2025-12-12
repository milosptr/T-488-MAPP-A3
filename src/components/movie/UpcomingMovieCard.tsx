import { ASPECT_RATIO } from '@/src/constants/constants';
import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { UpcomingMovie } from '@/src/types';
import { getTrailerKey } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { LiquidButton, Skeleton, Text } from '../ui';

type Props = {
    movie: UpcomingMovie;
    onTrailerPress?: (trailerKey: string) => void;
};

const PLAY_ICON_SIZE = 22;
const GRADIENT_HEIGHT = 200;

const formatReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const UpcomingMovieCard = ({ movie, onTrailerPress }: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage, isLoading } = useMovieBackdrop(movie.ids.tmdb);

    const trailerKey = getTrailerKey(movie);

    const handleTrailerPress = () => {
        if (trailerKey && onTrailerPress) {
            onTrailerPress(trailerKey);
        }
    };

    if (isLoading) {
        return <Skeleton show={true} width="100%" height={208} radius={borderRadius.md} />;
    }

    return (
        <View style={[styles.posterContainer, { backgroundColor: colors.surface }]}>
            <Image
                source={{ uri: backdropImage ?? movie.poster }}
                resizeMode="cover"
                style={styles.poster}
            />
            <LinearGradient
                colors={['transparent', colors.surface]}
                style={styles.gradient}
                start={{ x: 0, y: 0.3 }}
                end={{ x: 0, y: 1 }}
            />

            <View style={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.title} numberOfLines={2}>
                            {movie.title}
                        </Text>
                    </View>
                    <View style={styles.infoDetails}>
                        <View style={styles.infoItem}>
                            <Text>{formatReleaseDate(movie['release-dateIS'])}</Text>
                        </View>
                    </View>
                </View>
                {!!trailerKey && (
                    <LiquidButton
                        glassEffectStyle="clear"
                        leadingIcon={
                            <Ionicons
                                name="play-circle-outline"
                                size={PLAY_ICON_SIZE}
                                color={colors.text}
                            />
                        }
                        text="Trailer"
                        style={styles.trailerButtonInner}
                        onPress={handleTrailerPress}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    posterContainer: {
        width: '100%',
        aspectRatio: ASPECT_RATIO.LANDSCAPE,
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
        gap: spacing.sm,
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
        gap: spacing.sm,
        opacity: 0.8,
    },
    trailerButtonInner: {
        paddingHorizontal: spacing.lg,
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: spacing.md,
    },
});
