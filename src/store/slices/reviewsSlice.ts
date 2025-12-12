import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

const REVIEWS_STORAGE_KEY = '@reviews';

export type Review = {
    id: string;
    movieId: string;
    rating: number;
    text: string;
    createdAt: string;
    userName?: string;
};

export type ReviewsState = {
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
        },
        setReviews: (state, action: PayloadAction<Review[]>) => {
            state.reviews = action.payload;
            state.isHydrated = true;
        },
    },
});

export const { addReview, setReviews } = reviewsSlice.actions;

export const reviewsReducer = reviewsSlice.reducer;

export const saveReviews = (reviews: Review[]) => {
    return AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
};

export const loadReviews = () => async (dispatch: (action: PayloadAction<Review[]>) => void) => {
    try {
        const stored = await AsyncStorage.getItem(REVIEWS_STORAGE_KEY);
        if (stored) {
            const reviews = JSON.parse(stored) as Review[];
            dispatch(setReviews(reviews));
        } else {
            dispatch(setReviews([]));
        }
    } catch {
        dispatch(setReviews([]));
    }
};

const selectReviews = (state: { reviews: ReviewsState }) => state.reviews.reviews;
const selectMovieId = (_state: { reviews: ReviewsState }, movieId: string) => movieId;

export const selectReviewsByMovieId = createSelector(
    [selectReviews, selectMovieId],
    (reviews, movieId) => reviews.filter(r => r.movieId === movieId)
);

export const selectAverageRatingByMovieId = createSelector([selectReviewsByMovieId], reviews => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
});
