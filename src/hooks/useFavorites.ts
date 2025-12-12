import { useOptimistic } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addFavorite, removeFavorite, saveFavorites, toggleFavorite } from '../store/slices';

export const useFavorites = () => {
    const dispatch = useAppDispatch();
    const favoriteIds = useAppSelector(state => state.favorites.movieIds);
    const isHydrated = useAppSelector(state => state.favorites.isHydrated);

    const [optimisticFavoriteIds, addOptimisticFavorite] = useOptimistic(
        favoriteIds,
        (state: string[], movieId: string) =>
            state.includes(movieId) ? state.filter(id => id !== movieId) : [...state, movieId]
    );

    const isFavorite = (movieId: string) => optimisticFavoriteIds.includes(movieId);

    const addToFavorites = (movieId: string) => {
        addOptimisticFavorite(movieId);
        dispatch(addFavorite(movieId));
        const newIds = [...favoriteIds, movieId];
        saveFavorites(newIds);
    };

    const removeFromFavorites = (movieId: string) => {
        addOptimisticFavorite(movieId);
        dispatch(removeFavorite(movieId));
        const newIds = favoriteIds.filter(id => id !== movieId);
        saveFavorites(newIds);
    };

    const toggleFavoriteStatus = (movieId: string) => {
        addOptimisticFavorite(movieId);
        dispatch(toggleFavorite(movieId));
        const newIds = favoriteIds.includes(movieId)
            ? favoriteIds.filter(id => id !== movieId)
            : [...favoriteIds, movieId];
        saveFavorites(newIds);
    };

    return {
        favoriteIds: optimisticFavoriteIds,
        isHydrated,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavoriteStatus,
    };
};
