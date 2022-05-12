import {createReducer } from '@reduxjs/toolkit'
import { Movie } from '../../models';
import {moviesActios} from '../actions/'
const {setMovies} = moviesActios;

type MoviesState = {
    moviesList: Array<Movie>,
    currentMovies?: Movie
}

const initialState : MoviesState = {
  moviesList: [],
    currentMovies: null
};

const moviesReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setMovies, (state, action) => {
        state.moviesList = [...action.payload]
      })
  })

export default moviesReducer;