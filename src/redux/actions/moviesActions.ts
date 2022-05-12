import { createAction } from "@reduxjs/toolkit";
import { Movie } from "../../models";

// export const ASYNC_CREATE_MOVIE = "movies/create";
// export const ASYNC_DELETE_MOVIE = "movies/delete";
// export const ASYNC_GET_MOVIE = "movies/get";
// export const ASYNC_GET_MOVIES = "movies/getAll";
// export const SET_MOVIES = "movies/set";

const actions = {
    setMovies: createAction<Array<Movie>>("movies/set")
}

export default actions;