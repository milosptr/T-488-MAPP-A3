import { borderRadius, fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovieBackdrop, useTheme } from '@/src/hooks';
import { UpcomingMovie } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useRef } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TrailerModal } from '../trailer/TrailerModal';
import { LiquidButton, Skeleton, Text } from '../ui';

type Props = {
    movie: UpcomingMovie;
};

const PLAY_ICON_SIZE = 22;

const formatReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const UpcomingMovieCard = ({ movie }: Props) => {
    const { colors } = useTheme();
    const { image: backdropImage, isLoading } = useMovieBackdrop(movie.ids.tmdb);

    const trailerRef = useRef<BottomSheetModal>(null);
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

    return (
        <>
            <Skeleton show={isLoading}>
                <View style={[styles.posterContainer, { backgroundColor: colors.surface }]}>
                    <Image
                        source={{ uri: backdropImage ?? movie.poster }}
                        resizeMode="contain"
                        style={styles.poster}
                    />
                    <LinearGradient
                        colors={['transparent', colors.surface]}
                        style={styles.gradient}
                        start={{ x: 0, y: 0.3 }}
                        end={{ x: 0, y: 1 }}
                    />
                    {!!trailerKey && (
                        <View style={styles.trailerButton}>
                            <LiquidButton
                                glassEffectStyle="regular"
                                leadingIcon={
                                    <Ionicons
                                        name="play-circle-outline"
                                        size={PLAY_ICON_SIZE}
                                        color={colors.text}
                                    />
                                }
                                text="Watch Trailer"
                                style={styles.trailerButtonInner}
                                onPress={() => trailerRef.current?.present()}
                            />
                        </View>
                    )}
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
                </View>
            </Skeleton>
            <TrailerModal ref={trailerRef} videoKey={trailerKey} />
        </>
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
    trailerButton: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        zIndex: 1,
    },
    trailerButtonInner: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
});
