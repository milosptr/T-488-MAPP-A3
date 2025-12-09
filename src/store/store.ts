import { configureStore } from '@reduxjs/toolkit';
import { filtersReducer } from './slices/filtersSlice';
import { favoritesReducer } from './slices/favoritesSlice';
import { reviewsReducer } from './slices/reviewsSlice';

export const store = configureStore({
    reducer: {
        filters: filtersReducer,
        favorites: favoritesReducer,
        reviews: reviewsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
