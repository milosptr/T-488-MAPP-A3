import { MOVIE_LIST_ITEM_WIDTH } from '@/src/constants/constants';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { Movie } from '@/src/types';
import { useTheme } from '@react-navigation/native';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { MovieListItem } from '../movie';
import { Text } from '../ui';

type Props = {
    cinema: { id: number; name: string };
    movies: Movie[];
};

const ITEM_WIDTH = MOVIE_LIST_ITEM_WIDTH + spacing.md;

const renderItem = ({ item }: ListRenderItemInfo<Movie>) => <MovieListItem movie={item} />;

const keyExtractor = (item: Movie) => item._id;

const Separator = () => <View style={styles.separator} />;

const getItemLayout = (_: unknown, index: number) => ({
    length: ITEM_WIDTH,
    offset: ITEM_WIDTH * index,
    index,
});

export const CinemaSection = ({ cinema, movies }: Props) => {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <Text
                style={[styles.cinemaName, { borderBottomColor: colors.border }]}
                numberOfLines={1}
            >
                {cinema.name}
            </Text>
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
        paddingBottom: spacing.sm,
        borderBottomWidth: 1,
    },
    scrollContent: {
        gap: spacing.md,
    },
    separator: {
        width: spacing.md,
    },
});
