import { CinemaListEmpty, CinemaListItem } from '@/src/components/cinema';
import { SafeAreaScreen } from '@/src/components/layout/SafeAreaScreen';
import { Text } from '@/src/components/ui';
import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useCinemas, useTheme } from '@/src/hooks';
import { Cinema } from '@/src/types';
import { FlatList, ListRenderItemInfo, RefreshControl, StyleSheet, View } from 'react-native';

const keyExtractor = (item: Cinema) => String(item.id);

const Separator = () => <View style={styles.separator} />;

export const CinemasScreen = () => {
    const { colors } = useTheme();
    const { data: cinemas = [], isLoading, isRefetching, refetch } = useCinemas();

    const renderItem = ({ item }: ListRenderItemInfo<Cinema>) => <CinemaListItem cinema={item} />;

    return (
        <SafeAreaScreen paddingLeft={0} paddingRight={0}>
            <View style={styles.header}>
                <Text style={styles.title}>Cinemas</Text>
            </View>
            <FlatList
                data={cinemas}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={Separator}
                ListEmptyComponent={<CinemaListEmpty isLoading={isLoading} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetching}
                        onRefresh={refetch}
                        tintColor={colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={10}
            />
        </SafeAreaScreen>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: spacing.lg,
    },
    title: {
        fontSize: fontSize.xxl,
        fontWeight: 'bold',
    },
    separator: {
        height: spacing.md,
    },
    listContent: {
        paddingTop: spacing.xl,
        paddingBottom: spacing.xl,
        flexGrow: 1,
    },
});
