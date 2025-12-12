import { RATING_OPTIONS, SHOWTIME_PRESETS } from '@/src/constants/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RatingFilter = (typeof RATING_OPTIONS)[number];
type ShowtimeFilter = (typeof SHOWTIME_PRESETS)[number];

export type FiltersState = {
    title: string;
    cinemas: number[];
    rating: RatingFilter | null;
    showtime: ShowtimeFilter | null;
    actors: string[];
    directors: string[];
    certificate: string | null;
};

const initialState: FiltersState = {
    title: '',
    cinemas: [],
    rating: null,
    showtime: null,
    actors: [],
    directors: [],
    certificate: null,
};

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setCinemas: (state, action: PayloadAction<number[]>) => {
            state.cinemas = action.payload;
        },
        setRating: (state, action: PayloadAction<RatingFilter | null>) => {
            state.rating = action.payload;
        },
        setShowtime: (state, action: PayloadAction<ShowtimeFilter | null>) => {
            state.showtime = action.payload;
        },
        setActors: (state, action: PayloadAction<string[]>) => {
            state.actors = action.payload;
        },
        setDirectors: (state, action: PayloadAction<string[]>) => {
            state.directors = action.payload;
        },
        setCertificate: (state, action: PayloadAction<string | null>) => {
            state.certificate = action.payload;
        },
    },
});

export const {
    setTitle,
    setCinemas,
    setRating,
    setShowtime,
    setActors,
    setDirectors,
    setCertificate,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
