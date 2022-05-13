import React, { useEffect, useState } from 'react';
import './App.scss';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAppDispatch } from './utils/hooks';
import { moviesActios } from './redux/actions';
import { AuthPage, HomePage } from './pages';
import { LoginForm, RegisterForm } from './components';


function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<AuthPage />}>
        <Route index element={<LoginForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
