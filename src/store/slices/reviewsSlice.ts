import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const REVIEWS_STORAGE_KEY = '@reviews';

export type Review = {
    id: string;
    movieId: string;
    rating: number;
    text: string;
    createdAt: string;
    userName?: string;
};

type ReviewsState = {
    reviews: Review[];
    isHydrated: boolean;
};

const initialState: ReviewsState = {
    reviews: [],
    isHydrated: false,
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        addReview: (state, action: PayloadAction<Omit<Review, 'id' | 'createdAt'>>) => {
            const newReview: Review = {
                ...action.payload,
                id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                createdAt: new Date().toISOString(),
            };
            state.reviews.unshift(newReview);
            AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state.reviews));
        },
        updateReview: (state, action: PayloadAction<Review>) => {
            const index = state.reviews.findIndex(r => r.id === action.payload.id);
            if (index > -1) {
                state.reviews[index] = action.payload;
                AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state.reviews));
            }
        },
        deleteReview: (state, action: PayloadAction<string>) => {
            state.reviews = state.reviews.filter(r => r.id !== action.payload);
            AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(state.reviews));
        },
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload;
            state.isHydrated = true;
        },
    },
});

export const { addReview, updateReview, deleteReview, setReviews } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;

export const loadReviews = () => async (dispatch: (action: PayloadAction<Review[]>) => void) => {
    try {
        const stored = await AsyncStorage.getItem(REVIEWS_STORAGE_KEY);
        if (stored) {
            const reviews = JSON.parse(stored) as Review[];
            dispatch(setReviews(reviews));
        } else {
            dispatch(setReviews([]));
        }
    } catch (error) {
        console.error('Failed to load reviews from AsyncStorage:', error);
        dispatch(setReviews([]));
    }
};

export const selectReviewsByMovieId = (state: { reviews: ReviewsState }, movieId: string) => {
    return state.reviews.reviews.filter(r => r.movieId === movieId);
};

export const selectAverageRatingByMovieId = (state: { reviews: ReviewsState }, movieId: string) => {
    const movieReviews = state.reviews.reviews.filter(r => r.movieId === movieId);
    if (movieReviews.length === 0) return 0;
    const sum = movieReviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / movieReviews.length;
};
