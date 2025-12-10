import { useFavorites, useTheme } from '@/src/hooks';
import { haptics } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LiquidButton } from '../ui';

type Props = {
    movieId: string;
};

export const FavoriteButton = ({ movieId }: Props) => {
    const { colors } = useTheme();
    const { isFavorite, toggleFavoriteStatus } = useFavorites();
    const favorite = isFavorite(movieId);

    const handlePress = () => {
        if (favorite) {
            haptics.light();
        } else {
            haptics.success();
        }
        toggleFavoriteStatus(movieId);
    };

    return (
        <LiquidButton
            style={styles.iconButton}
            glassEffectStyle="regular"
            leadingIcon={
                <Ionicons
                    name={favorite ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favorite ? colors.secondary : colors.text}
                />
            }
            onPress={handlePress}
            disableHaptic
        />
    );
};

const styles = StyleSheet.create({
    iconButton: {
        borderRadius: 48,
        width: 48,
        paddingHorizontal: 0,
        height: 48,
    },
});
