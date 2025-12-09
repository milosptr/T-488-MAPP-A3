import { useTheme } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

type Size = 'sm' | 'md' | 'lg';

type Props = {
    rating: number;
    size?: Size;
    onRatingChange?: (rating: number) => void;
};

const STAR_COLOR = '#FFD700';
const STAR_SIZES: Record<Size, number> = { sm: 16, md: 24, lg: 40 };
const STAR_GAPS: Record<Size, number> = { sm: 2, md: 4, lg: 8 };

export const StarRating = ({ rating, size = 'md', onRatingChange }: Props) => {
    const { colors } = useTheme();
    const starSize = STAR_SIZES[size];
    const interactive = !!onRatingChange;

    const stars = [1, 2, 3, 4, 5].map(star => {
        const filled = star <= rating;
        const icon = (
            <Ionicons
                name={filled ? 'star' : 'star-outline'}
                size={starSize}
                color={filled ? STAR_COLOR : colors.text}
            />
        );

        if (interactive) {
            return (
                <Pressable key={star} onPress={() => onRatingChange(star)}>
                    {icon}
                </Pressable>
            );
        }
        return <View key={star}>{icon}</View>;
    });

    return <View style={[styles.container, { gap: STAR_GAPS[size] }]}>{stars}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
