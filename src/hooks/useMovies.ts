import { useAppDispatch } from '../hooks';
import { moviesActions } from "../redux/movieSlice";

export type MoviesServiceModel = {
    fetchMovies: Function;
};

const useMovies = (): MoviesServiceModel => {
    const dispatch = useAppDispatch();

    return {
        fetchMovies: () => dispatch(moviesActions.fetchMovies())
    };
}


export default useMovies;

