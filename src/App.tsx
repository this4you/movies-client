import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  Routes,
  Route
} from "react-router-dom";
import { useAppDispatch } from './utils/hooks';
import { moviesActios } from './redux/actions';
import { AuthPage, HomePage } from './pages';


function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<AuthPage />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
    // <div className="wrapp">
    //   <div className="form-wrapp">
    //     <MovieForm submitHandle={() => { }} cinemaFormats={["VHS", "DVD", "Blu-Ray"]} />
    //   </div>
    //   <div className="list-wrapp">
    //     <MovieList />
    //   </div>
    // </div>
  );
}

export default App;
