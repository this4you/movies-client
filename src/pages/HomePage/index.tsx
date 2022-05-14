import React, { useEffect } from 'react';
import { MovieForm, MovieList } from '../../components';
import { moviesActios } from '../../redux/actions';
import { useAppDispatch } from '../../utils/hooks';
import './HomePage.scss';

function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(moviesActios.setMovies([
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
