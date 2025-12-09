import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@favorites';

type FavoritesState = {
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
                // Persist to AsyncStorage
                AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.movieIds));
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            const movieId = action.payload;
            state.movieIds = state.movieIds.filter((id) => id !== movieId);
            // Persist to AsyncStorage
            AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.movieIds));
        },
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const movieId = action.payload;
            const index = state.movieIds.indexOf(movieId);
            if (index > -1) {
                state.movieIds.splice(index, 1);
            } else {
                state.movieIds.push(movieId);
            }
            // Persist to AsyncStorage
            AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.movieIds));
        },
        setFavorites: (state, action: PayloadAction<string[]>) => {
            state.movieIds = action.payload;
            state.isHydrated = true;
        },
        reorderFavorites: (state, action: PayloadAction<{ from: number; to: number }>) => {
            const { from, to } = action.payload;
            const [removed] = state.movieIds.splice(from, 1);
            state.movieIds.splice(to, 0, removed);
            // Persist to AsyncStorage
            AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.movieIds));
        },
    },
});

export const { addFavorite, removeFavorite, toggleFavorite, setFavorites, reorderFavorites } =
    favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

// Thunk to load favorites from AsyncStorage
export const loadFavorites = () => async (dispatch: (action: PayloadAction<string[]>) => void) => {
    try {
        const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
        if (stored) {
            const movieIds = JSON.parse(stored) as string[];
            dispatch(setFavorites(movieIds));
        } else {
            dispatch(setFavorites([]));
        }
    } catch (error) {
        console.error('Failed to load favorites from AsyncStorage:', error);
        dispatch(setFavorites([]));
    }
};
