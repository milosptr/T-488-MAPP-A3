import { MOVIE_LIST_ITEM_WIDTH } from '@/src/constants/constants';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { Movie } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MovieListItem } from '../movie';
import { Text } from '../ui';

type Props = {
    cinema: { id: number; name: string };
    movies: Movie[];
};

const ITEM_WIDTH = MOVIE_LIST_ITEM_WIDTH + spacing.md;
const CHEVRON_SIZE = 20;

const keyExtractor = (item: Movie) => item._id;

const Separator = () => <View style={styles.separator} />;

const getItemLayout = (_: unknown, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
});

export const CinemaSection = ({ cinema, movies }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();
    const renderItem = ({ item }: ListRenderItemInfo<Movie>) => (
        <MovieListItem movie={item} cinemaId={cinema.id} />
    );

    const handleNavigate = () => {
        router.push(`/cinemas/${cinema.id}`);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cinemaNameContainer} onPress={handleNavigate}>
                <Text style={styles.cinemaName} numberOfLines={1}>
                    {cinema.name}
                </Text>
                <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textSecondary} />
            </TouchableOpacity>
            <FlatList
                horizontal
                data={movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={Separator}
                getItemLayout={getItemLayout}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                initialNumToRender={3}
                maxToRenderPerBatch={2}
                windowSize={5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    cinemaName: {
        fontSize: fontSize.xl,
        fontWeight: 'bold',
    },
    scrollContent: {
        gap: spacing.md,
    },
    separator: {
        width: spacing.md,
    },
    cinemaNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
