import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const FAVORITES_STORAGE_KEY = '@favorites';

export type FavoritesState = {
    movieIds: string[];
    isHydrated: boolean;
};

const initialState: FavoritesState = {
    movieIds: [],
    isHydrated: false,
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<string>) => {
            const movieId = action.payload;
            if (!state.movieIds.includes(movieId)) {
                state.movieIds.push(movieId);
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            const movieId = action.payload;
            state.movieIds = state.movieIds.filter(id => id !== movieId);
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const movieId = action.payload;
            const index = state.movieIds.indexOf(movieId);
            if (index > -1) {
                state.movieIds.splice(index, 1);
            } else {
                state.movieIds.push(movieId);
            }
        },
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.movieIds = action.payload;
            state.isHydrated = true;
        },
        setFavoriteOrder: (state, action: PayloadAction<string[]>) => {
            state.movieIds = action.payload;
        },
    },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavorites, setFavoriteOrder } =
    favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const saveFavorites = (movieIds: string[]) => {
    return AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(movieIds));
};

export const loadFavorites = () => async (dispatch: (action: PayloadAction<string[]>) => void) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            const movieIds = JSON.parse(stored) as string[];
            dispatch(setFavorites(movieIds));
        } else {
            dispatch(setFavorites([]));
        }
    } catch {
        dispatch(setFavorites([]));
    }
};
