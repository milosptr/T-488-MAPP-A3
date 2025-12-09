import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { Text } from '@/src/components/ui';
import { LegendList, LegendListRef, LegendListRenderItemProps } from '@legendapp/list';
import { useRef } from 'react';
import { RefreshControl, StyleSheet, useWindowDimensions, View } from 'react-native';
import { MovieListEmpty } from '../components/movie';
import { UpcomingMovieCard } from '../components/movie/UpcomingMovieCard';
import { fontSize, spacing } from '../constants/DesignTokens';
import { useUpcoming } from '../hooks';
import { UpcomingMovie } from '../types';

export const UpcomingScreen = () => {
    const ref = useRef<LegendListRef>(null);
    const { data: upcoming = [], isLoading, isRefetching, refetch } = useUpcoming();
    const { width } = useWindowDimensions();
    const cardHeight = (width * 9) / 16 - 32;

    const renderItem = ({ item }: LegendListRenderItemProps<UpcomingMovie>) => {
        return <UpcomingMovieCard movie={item} />;
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
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                ListEmptyComponent={
                    <MovieListEmpty isLoading={isLoading} cardHeight={cardHeight} />
                }
            />
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
