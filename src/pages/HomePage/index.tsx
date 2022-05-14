import React, { useEffect } from 'react';
import { MovieForm, MovieList } from '../../components';
import { useMovies } from '../../hooks';
import './HomePage.scss';

function HomePage() {

  const { fetchMovies } = useMovies();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

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
