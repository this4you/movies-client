import React, { FC, ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from '@mui/material';
import "./LoginForm.scss"
import { Link } from 'react-router-dom';

type LoginForm = {
  email: string;
  password: string;
};


const LoginForm: FC<{}> = (): ReactElement => {

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  return (
    <Paper elevation={12} className="register-form">
      <TextField type={'email'} id="email" name="email" className="form-input" label="Email"
        variant="outlined"
        {...register("email", { required: true, maxLength: 30 })}
        error={!!errors.email}
      />
      <TextField type={'password'}  id="password" name="password" className="form-input" label="Password"
        variant="outlined"
        {...register("password", { required: true, maxLength: 20 })}
        error={!!errors.password}
      />
      <Button variant="contained" color="info">Sing IN</Button>
      <Link to={'/register'}>Sing up</Link>
    </Paper>
  )
}

export default LoginForm;
