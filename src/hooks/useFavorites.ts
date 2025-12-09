import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite, toggleFavorite } from '../store/slices';

export const useFavorites = () => {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector((state) => state.favorites.movieIds);
    const isHydrated = useAppSelector((state) => state.favorites.isHydrated);

    const isFavorite = useCallback(
        (movieId: string) => {
            return favoriteIds.includes(movieId);
        },
        [favoriteIds]
    );

    const addToFavorites = useCallback(
        (movieId: string) => {
            dispatch(addFavorite(movieId));
        },
        [dispatch]
    );

    const removeFromFavorites = useCallback(
        (movieId: string) => {
            dispatch(removeFavorite(movieId));
        },
        [dispatch]
    );

    const toggleFavoriteStatus = useCallback(
        (movieId: string) => {
            dispatch(toggleFavorite(movieId));
        },
        [dispatch]
    );

    return {
        favoriteIds,
        isHydrated,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavoriteStatus,
    };
};
