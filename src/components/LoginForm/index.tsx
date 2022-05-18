import React, { FC, ReactElement, useState } from 'react';
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from '@mui/material';
import "./LoginForm.scss"
import { Link } from 'react-router-dom';
import { LoginUserModel } from '../../models';
import { useAuth } from '../../hooks';
import { MovieSpinner } from '..';
// import {formValidator} from '@/utils';
 import {formValidator} from '../../utils';
const {processErrors} = formValidator;

const LoginForm: FC<{}> = (): ReactElement => {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginUserModel>();

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    auth.signIn(data).then((data) => {
      setLoading(false);
      const asyncErrors = data?.payload?.error;
      if (asyncErrors) {
        processErrors(asyncErrors, setError);
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Paper elevation={12} className="register-form">
        <h1>Login</h1>
        <TextField type={'email'} id="email" name="email" className="form-input" label="Email"
          variant="outlined"
          {...register("email", { required: true, maxLength: 30 })}
          error={!!errors.email}
        />
        <TextField type={'password'} id="password" name="password" className="form-input" label="Password"
          variant="outlined"
          {...register("password", { required: true, maxLength: 20 })}
          error={!!errors.password}
        />
        <Button type="submit" variant="contained" color="info">Sing IN</Button>
        <Link to={'/register'}>Sign up</Link>
        <MovieSpinner loading={loading}></MovieSpinner>
      </Paper>
    </form>
  )
}

export default LoginForm;
