import { BottomSheetModal } from '@/src/components/bottom-sheet';
import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { TrailerModal } from '@/src/components/trailer';
import { Text } from '@/src/components/ui';
import { LegendList, LegendListRef, LegendListRenderItemProps } from '@legendapp/list';
import { useCallback, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';
import { MovieCard, MovieListEmpty } from '../components/movie';
import { fontSize, spacing } from '../constants/DesignTokens';
import { useUpcoming } from '../hooks';
import { Movie, UpcomingMovie } from '../types';

const ItemSeparator = () => <View style={styles.separator} />;
const formatReleaseDate = (releaseDate: string) => {
    const date = new Date(releaseDate);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
export const UpcomingScreen = () => {
    const ref = useRef<LegendListRef>(null);
    const trailerRef = useRef<BottomSheetModal>(null);
    const [selectedTrailerKey, setSelectedTrailerKey] = useState<string | null>(null);
    const { data: upcoming = [], isLoading, isRefetching, refetch } = useUpcoming();
    const { width } = useWindowDimensions();
    const cardHeight = (width * 9) / 16 - 32;

    const handleTrailerPress = useCallback((trailerKey: string) => {
        console.log('trailerKey', trailerKey);
        setSelectedTrailerKey(trailerKey);
        trailerRef.current?.present();
    }, []);

    const renderItem = ({ item }: LegendListRenderItemProps<UpcomingMovie>) => {
        const movie: Movie = {
            ...item,
            year: formatReleaseDate(item['release-dateIS']),
            showtimes: [],
        };

        return (
            <MovieCard
                movie={movie}
                horizontal
                showFavoriteButton
                onTrailerPress={handleTrailerPress}
            />
        );
    };

    return (
        <SafeAreaScreen>
            <View style={styles.header}>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Upcoming</Text>
                </View>
            </View>
            <LegendList
                ref={ref}
                data={upcoming}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                recycleItems={true}
                maintainVisibleContentPosition
                ItemSeparatorComponent={ItemSeparator}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                ListEmptyComponent={
                    <MovieListEmpty isLoading={isLoading} cardHeight={cardHeight} />
                }
            />
            <TrailerModal ref={trailerRef} videoKey={selectedTrailerKey} />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: spacing.xl,
        gap: spacing.lg,
    },
    titleSection: {
        gap: spacing.xs,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    separator: {
        height: spacing.xxl,
    },
});
