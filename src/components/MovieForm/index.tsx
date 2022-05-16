import React, { FC, ReactElement } from 'react';
import { useForm } from "react-hook-form";
import { ImportExport } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, styled, TextField } from '@mui/material';
import "./MovieForm.scss"
import { MovieModel } from '../../models';
import { useMovies } from '../../hooks';
import { ActorsFormControl } from '..';

type MovieFormProps = {
  submitHandle: Function,
  cinemaFormats: Array<string>
}

const Input = styled('input')({
  display: 'none',
});


const MovieForm: FC<MovieFormProps> = ({ submitHandle, cinemaFormats }): ReactElement => {

  const { register, reset, handleSubmit, formState: { errors } } = useForm<MovieModel>();
  const { createMovie, fetchMovies, importMovie } = useMovies();
  const [actors, setActors] = React.useState<string[]>([]);

  const onSubmit = handleSubmit(data => {
    data = actors ? { ...data, actors } : data;
    createMovie(data).then((responseData) => {
      if (responseData?.payload?.status === 1) {
        fetchMovies();
        reset();
      }
    });
  });

  const importHandler = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      importMovie(file).then((responseData) => {
        if (responseData?.payload?.status === 1) {
          fetchMovies();
        }
      })
    }
  };

  return (
    <Paper elevation={3} className="form" >
      <div className="title">
        <h2>Add new cinema</h2>
      </div>
      <div className="fields">
        <form onSubmit={onSubmit}>

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
              {cinemaFormats.map((format) => <MenuItem value={format} key={format}>{format}</MenuItem>)}
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
    </Paper >
  )
}

export default MovieForm;
