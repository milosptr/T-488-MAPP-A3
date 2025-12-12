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

const CHEVRON_SIZE = 20;

export const CinemaSection = ({ cinema, movies }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();

    const handleNavigate = () => {
        router.push(`/cinemas/${cinema.id}`);
    };
    const renderItem = ({ item: movie }: ListRenderItemInfo<Movie>) => (
        <MovieListItem key={movie._id} movie={movie} cinemaId={cinema.id} />
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cinemaNameContainer} onPress={handleNavigate}>
                <Text style={styles.cinemaName} numberOfLines={1}>
                    {cinema.name}
                </Text>
                <Ionicons name="chevron-forward" size={CHEVRON_SIZE} color={colors.textSecondary} />
            </TouchableOpacity>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={() => <View style={styles.itemSpacing} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                initialNumToRender={3}
                maxToRenderPerBatch={5}
                windowSize={3}
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
        flexDirection: 'row',
    },
    itemSpacing: {
        width: spacing.lg,
    },
    cinemaNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
