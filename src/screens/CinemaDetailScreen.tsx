import {
    BackButton,
    CinemaDetailHeader,
    CinemaDetailSkeleton,
    CinemaShowtimes,
} from '@/src/components/cinema';
import { MovieListEmpty, MovieListItem, MoviesLoadingSkeleton } from '@/src/components/movie';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useCinema, useMoviesByCinema, useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, View } from 'react-native';
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaScreen } from '../components/layout';

const TITLE_SHOW_THRESHOLD = 80;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Movie>);

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

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: event => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerTitleStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            scrollY.value,
            [TITLE_SHOW_THRESHOLD - 20, TITLE_SHOW_THRESHOLD + 20],
            [0, 1],
            Extrapolation.CLAMP
        ),
    }));

    const handleRefresh = () => {
        refetchCinema();
        refetchMovies();
    };

    if (!id) {
        return <Redirect href="/+not-found" />;
    }

    if (isLoadingCinema) {
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
            <MovieListItem movie={item} cinemaId={cinemaId} width={'100%'} horizontal />
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

    const ListEmpty = isLoadingMovies ? (
        <MoviesLoadingSkeleton />
    ) : (
        <MovieListEmpty isLoading={false} cardHeight={CARD_HEIGHT} />
    );

    return (
        <SafeAreaScreen style={styles.container}>
            <View style={styles.headerRow}>
                <BackButton />
                <Animated.Text
                    style={[styles.headerTitle, { color: colors.text }, headerTitleStyle]}
                    numberOfLines={1}
                >
                    {cinema.name}
                </Animated.Text>
            </View>
            <AnimatedFlatList
                data={isLoadingMovies ? [] : movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={ListHeader}
                ListEmptyComponent={ListEmpty}
                ItemSeparatorComponent={Separator}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
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
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: spacing.lg,
        gap: spacing.lg,
    },
    headerTitle: {
        flex: 1,
        fontSize: fontSize.xxl,
        fontWeight: '600',
    },
    listContent: {
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
