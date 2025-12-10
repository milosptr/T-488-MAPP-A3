import {
    BackButton,
    CinemaDetailHeader,
    CinemaDetailSkeleton,
    CinemaShowtimes,
} from '@/src/components/cinema';
import { MovieListEmpty, MovieListItem } from '@/src/components/movie';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useCinema, useMoviesByCinema, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CARD_HEIGHT = 200;

const keyExtractor = (item: Movie) => item._id;

export const CinemaDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const cinemaId = id ? Number(id) : undefined;
    const {
        data: cinema,
        isLoading: isLoadingCinema,
        refetch: refetchCinema,
    } = useCinema(cinemaId);
    const {
        data: movies = [],
        isLoading: isLoadingMovies,
        refetch: refetchMovies,
        isRefetching,
    } = useMoviesByCinema(cinemaId);

    const isLoading = isLoadingCinema || isLoadingMovies;

    const handleRefresh = () => {
        refetchCinema();
        refetchMovies();
    };

    if (!id) {
        return <Redirect href="/+not-found" />;
    }

    if (isLoading) {
        return (
            <View style={[styles.container, { paddingTop: insets.top }]}>
                <BackButton />
                <CinemaDetailSkeleton />
            </View>
        );
    }

    if (!cinema) {
        return <Redirect href="/+not-found" />;
    }

    const renderItem = ({ item }: ListRenderItemInfo<Movie>) => (
        <View style={styles.itemContainer}>
            <MovieListItem movie={item} cinemaId={cinemaId} width={'100%'} />
            <CinemaShowtimes
                showtimes={item.showtimes.filter(st => st.cinema.id === cinemaId)}
                isLoading={false}
            />
        </View>
    );

    const ListHeader = (
        <>
            <CinemaDetailHeader cinema={cinema} />
            <Text style={styles.sectionTitle}>Now Playing</Text>
        </>
    );

    const Separator = () => <View style={[styles.separator, { backgroundColor: colors.border }]} />;

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <BackButton />
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={<MovieListEmpty isLoading={false} cardHeight={CARD_HEIGHT} />}
                ItemSeparatorComponent={Separator}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={handleRefresh}
                        tintColor={colors.primary}
                    />
                }
                contentContainerStyle={[
                    styles.listContent,
                    { paddingBottom: insets.bottom + spacing.xl },
                ]}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: spacing.lg,
        flexGrow: 1,
    },
    sectionTitle: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
        marginTop: spacing.md,
        marginBottom: spacing.md,
    },
    separator: {
        height: 1,
        marginVertical: spacing.md,
    },
    itemContainer: {
        gap: spacing.md,
    },
});
