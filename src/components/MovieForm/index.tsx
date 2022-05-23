import React, { FC, ReactElement, useState } from 'react';
import { useForm } from "react-hook-form";
import { ImportExport } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, styled, TextField } from '@mui/material';
import "./MovieForm.scss"
import { MovieModel } from '../../models';
import { useMovies } from '../../hooks';
import { ActorsFormControl, MovieSpinner } from '..';
import { formValidator } from '../../utils';
const { processErrors } = formValidator;

const Input = styled('input')({
  display: 'none',
});


const MovieForm: FC<{}> = (): ReactElement => {
  const movieFormats = ["VHS", "DVD", "Blu-Ray"];
  const { register, reset, handleSubmit, setError, formState: { errors } } = useForm<MovieModel>();
  const { createMovie, needUpdate, importMovie } = useMovies();
  const [loading, setLoading] = useState(false);
  const [actors, setActors] = React.useState<string[]>([]);

  const createMovieHandler = handleSubmit(data => {
    setLoading(true);
    data = actors ? { ...data, actors } : data;
    createMovie(data).then((responseData) => {
      setLoading(false);
      if (responseData?.payload?.status === 1) {
        needUpdate();
        setActors([])
        reset();
      } else {
        const asyncErrors = responseData?.payload?.error;
        if (asyncErrors) {
          processErrors(asyncErrors, setError);
        }
      }
    });
  });

  const importHandler = (event) => {
    if (event.target.files) {
      setLoading(true);
      const file = event.target.files[0];
      importMovie(file).then((responseData) => {
        if (responseData?.payload?.status === 1) {
          needUpdate();
          setLoading(false);
        }
      })
    }
  };

  return (
    <Paper elevation={3} className="movie-form" >
      <div className="movie-form-wrapp">
        <div className="title">
          <h2>Add new movie</h2>
        </div>
        <div className="fields">
          <form onSubmit={createMovieHandler}>

            <TextField id="title" name="title" className="form-input" label="Title" variant="outlined"
              {...register("title", { required: true, maxLength: 20 })}
              error={!!errors.title}
            />

            <TextField type="number" id="year" name="year" className="form-input" label="Year" variant="outlined"
              {...register("year", { required: true, maxLength: 4, min: 1895, max: new Date().getFullYear() })}
              error={!!errors.year}
            />

            <FormControl fullWidth className="form-input">
              <InputLabel id="format-select-label">Format</InputLabel>
              <Select error={!!errors.format}
                {...register("format", { required: true })}
                labelId="format-select-label"
                id="format-select"
                label="Format"

                defaultValue={""}
              >
                {movieFormats.map((format) => <MenuItem value={format} key={format}>{format}</MenuItem>)}
              </Select>
            </FormControl>


            <ActorsFormControl actors={actors} setActors={setActors} />

            <Stack direction="row" spacing={3}>
              <label htmlFor="contained-button-file">
                <Input onChange={importHandler} id="contained-button-file" multiple type="file" />
                <Button variant="outlined" component="span" startIcon={<ImportExport />}>
                  Import
                </Button>
              </label>
              <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                Create
              </Button>
            </Stack>
          </form>
        </div>
      </div>
      <MovieSpinner loading={loading}></MovieSpinner>
    </Paper >
  )
}

export default MovieForm;
