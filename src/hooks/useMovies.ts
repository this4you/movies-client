import { useAppDispatch } from '../hooks';
import { MovieModel } from '../models';
import { moviesActions } from "../redux/movieSlice";

export type MoviesServiceModel = {
    fetchMovies: Function;
    createMovie: Function;
};

const useMovies = (): MoviesServiceModel => {
    const dispatch = useAppDispatch();

    return {
        fetchMovies: () => dispatch(moviesActions.fetchMovies()),
        createMovie: (movie: MovieModel) => dispatch(moviesActions.createMovie(movie))
    };
}


export default useMovies;

