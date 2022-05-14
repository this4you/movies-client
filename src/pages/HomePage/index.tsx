import React, { useEffect } from 'react';
import { MovieForm, MovieList } from '../../components';
import { moviesActions } from '../../redux/movieSlice';
import { useAppDispatch } from '../../hooks';
import './HomePage.scss';

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(moviesActions.setMovies([
      {
        id: 1, title: "Test Movie", format: "Test", year: 2000, actors: []
      }
    ]))
  }, [dispatch]);
  
  return (
   <div className="wrapp">
      <div className="form-wrapp">
        <MovieForm submitHandle={() => { }} cinemaFormats={["VHS", "DVD", "Blu-Ray"]} />
      </div>
      <div className="list-wrapp">
        <MovieList />
      </div>
    </div>
  );
}

export default HomePage;
