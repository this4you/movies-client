import React, { FC, ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from '@mui/material';
import "./RegisterForm.scss"
import { Link } from 'react-router-dom';
import { RegisterUserModel } from '../../models';
import { useAuth } from '../../utils/ProvideAuth';
import { processErrors } from '../../utils/formValidations';

const RegisterForm: FC<{}> = (): ReactElement => {
  const auth = useAuth();
  const { register, setError, handleSubmit, formState: { errors } } = useForm<RegisterUserModel>();
  console.log(errors);

  const onSubmit = handleSubmit(data => {
    auth.signUp(data).then((data) => {
      const asyncErrors = data?.payload?.error;
      if (asyncErrors) {
        processErrors(asyncErrors, setError);
      }
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Paper elevation={12} className="register-form">
        <TextField type={'email'} id="email" name="email" className="form-input" label="Email"
          variant="outlined"
          {...register("email", { required: true, maxLength: 30 })}
          error={!!errors.email}
        />
        <TextField id="name" name="name" className="form-input" label="Name"
          variant="outlined"
          {...register("name", { required: true, maxLength: 20 })}
          error={!!errors.name}
        />
        <TextField type={'password'} id="password" name="password" className="form-input" label="Password"
          variant="outlined"
          {...register("password", { required: true, maxLength: 20 })}
          error={!!errors.password}
        />
        <TextField type={'password'} id="confirmPassword" name="confirmPassword" className="form-input" label="Confirm password" variant="outlined"
          {...register("confirmPassword", { required: true, maxLength: 20 })}
          error={!!errors.confirmPassword}
        />
        <Button type={'submit'} variant="contained" color="info">Sing UP</Button>
        <Link to={'/login'}>Sing ip</Link>
      </Paper>
    </form>
  )
}

export default RegisterForm;
