import { MovieListParams } from '@/api/movieApi';
import { useAppDispatch } from '../hooks';
import { MovieModel } from '../models';
import { moviesActions } from "../redux/movieSlice";

export type MoviesServiceModel = {
    fetchMovies: Function;
    createMovie: Function;
    importMovie: Function;
    needUpdate: Function;
};

const useMovies = (): MoviesServiceModel => {
    const dispatch = useAppDispatch();

    return {
        fetchMovies: (params?: MovieListParams) => dispatch(moviesActions.fetchMovies(params)),
        createMovie: (movie: MovieModel) => dispatch(moviesActions.createMovie(movie)),
        importMovie: (file) => dispatch(moviesActions.importMovie(file)),
        needUpdate: () => dispatch(moviesActions.needUpdate())
    };
}


export default useMovies;

