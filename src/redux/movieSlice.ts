import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { moviesApi } from "../api"
import { MovieModel } from "../models"


type MoviesState = {
    moviesList: Array<MovieModel>,
    currentMovies?: MovieModel
}

const initialState: MoviesState = {
    moviesList: [],
    currentMovies: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state: MoviesState, action) {
            state.moviesList = [...action.payload]
        }
    },
    extraReducers: (builder) => {

    },
})

export const moviesReducer = movieSlice.reducer;

export const moviesActions = { ...movieSlice.actions };
