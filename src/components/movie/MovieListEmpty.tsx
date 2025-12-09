import { Skeleton, Text } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { StyleSheet, View } from 'react-native';

type Props = {
    isLoading: boolean;
    cardHeight: number;
};

export const MovieListEmpty = ({ isLoading, cardHeight }: Props) => {
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Skeleton show width="100%" height={cardHeight} />
                <Skeleton show width="100%" height={cardHeight} />
                <Skeleton show width="100%" height={cardHeight} />
            </View>
        );
    }

    return <Text>No movies found</Text>;
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.xl,
    },
});
