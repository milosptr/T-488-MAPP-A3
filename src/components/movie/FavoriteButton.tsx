import { useFavorites } from '@/src/hooks';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = {
    movieId: string;
    size?: number;
    color?: string;
};

export const FavoriteButton = ({ movieId, size = 24, color = '#fff' }: Props) => {
    const { isFavorite, toggleFavoriteStatus } = useFavorites();
    const favorite = isFavorite(movieId);

    const handlePress = () => {
        toggleFavoriteStatus(movieId);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            hitSlop={8}
        >
            <Ionicons
                name={favorite ? 'heart' : 'heart-outline'}
                size={size}
                color={favorite ? '#FF6B6B' : color}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.95 }],
    },
});
