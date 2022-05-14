import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { moviesApi } from "../api"
import { MovieModel } from "../models"


type MoviesState = {
    moviesList: Array<MovieModel>,
    currentMovies?: MovieModel
}

const fetchMovies = createAsyncThunk(
    'movies/fetchList',
    async () => {
        const response = await moviesApi.getAll();
        return response.data
    }
)

const createMovie = createAsyncThunk(
    'movies/create',
    async (movie: MovieModel) => {
        const response = await moviesApi.create(movie);
        return response.data;
    }
)

const initialState: MoviesState = {
    moviesList: [],
    currentMovies: null
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state: MoviesState, action) => {
            state.moviesList = [...action.payload.data]
        })
    },
})

export const moviesReducer = movieSlice.reducer;

export const moviesActions = { ...movieSlice.actions, fetchMovies, createMovie };
