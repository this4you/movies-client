import React, { FC, ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { ImportExport, Add } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import {Button,Paper,TextField } from '@mui/material';
import "./RegisterForm.scss"
import { Link } from 'react-router-dom';

type MovieFormProps = {
  submitHandle: Function,
  cinemaFormats: Array<string>
}

type RegisterFormData = {
  email: string;
  name: Number;
  password: string;
  confirmPassword: string;
};


const RegisterForm: FC<{}> = (): ReactElement => {

  const { register, setValue, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  return (
    <Paper elevation={12} className="register-form">
      <TextField type={'email'} id="email" name="email" className="form-input" label="Email"
        variant="outlined"
        {...register("email", { required: true, maxLength: 30 })}
        error={!!errors.name}
      />
      <TextField id="name" name="name" className="form-input" label="Name"
        variant="outlined"
        {...register("name", { required: true, maxLength: 20 })}
        error={!!errors.name}
      />
      <TextField type={'password'}  id="password" name="password" className="form-input" label="Password"
        variant="outlined"
        {...register("password", { required: true, maxLength: 20 })}
        error={!!errors.name}
      />
      <TextField id="confirmPassword" name="confirmPassword" className="form-input" label="Confirm password" variant="outlined"
        {...register("confirmPassword", { required: true, maxLength: 20 })}
        error={!!errors.name}
      />
      <Button variant="contained" color="info">Sing UP</Button>
      <Link to={'/login'}>Sing ip</Link>
    </Paper>
  )
}

export default RegisterForm;
