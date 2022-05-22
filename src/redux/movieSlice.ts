import { MovieListParams } from "@/api/movieApi"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { moviesApi } from "../api"
import { MovieModel } from "../models"


type MoviesState = {
    moviesList: Array<MovieModel>,
    totalCount: number,
    isNeedUpdate: boolean,
    currentMovies?: MovieModel
}

const fetchMovies = createAsyncThunk(
    'movies/fetchList',
    async (params?: MovieListParams) => {
        const response = await moviesApi.getAll(params);
        return response.data;
    }
)

const deleteMovie = createAsyncThunk(
    'movies/delete',
    async (id: string) => {
        const response = await moviesApi.delete(id);
        return response.data;
    }
)

const createMovie = createAsyncThunk(
    'movies/create',
    async (movie: MovieModel) => {
        const response = await moviesApi.create(movie);
        return response.data;
    }
)

const importMovie = createAsyncThunk(
    'movies/import',
    async (file: any) => {
        const response = await moviesApi.import(file);
        return response.data;
    }
)

const initialState: MoviesState = {
    moviesList: [],
    totalCount: 0,
    currentMovies: null,
    isNeedUpdate: false
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        needUpdate(state) {
            state.isNeedUpdate = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state: MoviesState, action) => {
            state.moviesList = [... (action?.payload?.data || [])];
            state.totalCount = action?.payload?.meta?.total;
            state.isNeedUpdate = false;
        })
    },
})

export const moviesReducer = movieSlice.reducer;

export const moviesActions = {
    ...movieSlice.actions,
    fetchMovies,
    deleteMovie,
    createMovie,
    importMovie
};
