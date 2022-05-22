import { Button } from '@mui/material';
import React from 'react';
import { MovieForm, MovieList } from '../../components';
import { useAuth } from '../../hooks';
import './HomePage.scss';

function HomePage() {
  const {logOut} = useAuth();
  
  return (
    <div className="wrapp">
      <div className="form-wrapp">
        <div className="log-out-container">
          <Button className="log-out-button" onClick={() => logOut()}>Log out</Button>
        </div>
        <div className="movie-form-container">
          <MovieForm />
        </div>
      </div>
      <div className="list-wrapp">
        <MovieList />
      </div>
    </div>
  );
}

export default HomePage;
