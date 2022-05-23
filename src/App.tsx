import React from 'react';
import './App.scss';
import {
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
import { AuthPage, HomePage, MovieInfoPage } from './pages';
import { LoginForm, RegisterForm } from './components';
import { useAuth } from './hooks';


function App() {
  const auth = useAuth();

  return (
    <Routes>
      <Route path="/movies" element={auth.session ? <HomePage /> : <Navigate to="/login" />} >
        <Route path=":movieId" element={<MovieInfoPage/>} />
      </Route>
      <Route path="/" element={!auth.session ? <AuthPage /> : <Navigate to="/movies" />}>
        <Route index element={<LoginForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
export default App;
