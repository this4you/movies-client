import { Login, Create } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RegisterForm } from '../../components';
import LoginForm from '../../components/LoginForm';
import './AuthPage.scss';

function AuthPage() {
  return (
    <div className="auth-page">
      <div className="auth-page-wrapp">
        <div className="auth-page-form">
          {/* <RegisterForm/> */}
          <LoginForm/>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
