import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { Text } from '@/src/components/ui';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import React from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { MovieCard } from '../components/movie';
import { fontSize, spacing } from '../constants/DesignTokens';
import { useMovies } from '../hooks';
import { Movie } from '../types';

export const HomeScreen = () => {
    const { data = [], isRefetching, refetch } = useMovies();

    const renderItem = ({ item }: LegendListRenderItemProps<Movie>) => {
        return <MovieCard movie={item} />;
    };

    return (
        <SafeAreaScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Showing in cinemas</Text>
            </View>
            <LegendList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                recycleItems={true}
                maintainVisibleContentPosition
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
            />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    separator: {
        height: spacing.xxl,
    },
});
