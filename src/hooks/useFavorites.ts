import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite, saveFavorites, toggleFavorite } from '../store/slices';

export const useFavorites = () => {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector(state => state.favorites.movieIds);
    const isHydrated = useAppSelector(state => state.favorites.isHydrated);

    const isFavorite = useCallback(
        (movieId: string) => {
            return favoriteIds.includes(movieId);
        },
        [favoriteIds]
    );

    const addToFavorites = useCallback(
        (movieId: string) => {
            dispatch(addFavorite(movieId));
            const newIds = [...favoriteIds, movieId];
            saveFavorites(newIds);
        },
        [dispatch, favoriteIds]
    );

    const removeFromFavorites = useCallback(
        (movieId: string) => {
            dispatch(removeFavorite(movieId));
            const newIds = favoriteIds.filter(id => id !== movieId);
            saveFavorites(newIds);
        },
        [dispatch, favoriteIds]
    );

    const toggleFavoriteStatus = useCallback(
        (movieId: string) => {
            dispatch(toggleFavorite(movieId));
            const newIds = favoriteIds.includes(movieId)
                ? favoriteIds.filter(id => id !== movieId)
                : [...favoriteIds, movieId];
            saveFavorites(newIds);
        },
        [dispatch, favoriteIds]
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
