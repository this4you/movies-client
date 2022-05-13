import React, { FC, ReactElement, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "./MovieList.scss"
import { IconButton, Paper, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Movie } from '../../models';
import { useAppSelector } from '../../utils/hooks';

type MovieListProps = {}


const MovieList: FC<MovieListProps> = (): ReactElement => {

  const rows = useAppSelector((state) => state.movies.moviesList);
  
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Movie name', width: 300 },
    { field: 'format', type: 'string', headerName: 'Format', width: 200 },
    { field: 'year', type: 'number', headerName: 'Year', width: 100 },
    {
      field: 'delete', headerName: '', width: 70, renderCell: (params) => {
        return (
          <IconButton onClick={() => { console.log(params.id) }} aria-label="delete">
            <Delete />
          </IconButton>
        );
      },
    }
  ];

  // const rows = [
  //   { id: 1, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 2, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 3, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 4, title: 'Anya', format: 'MP4', year: 2005 },
  //   { id: 5, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 6, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 7, title: 'Anya', format: 'MP4', year: 2010 },
  //   { id: 8, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 9, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 10, title: 'Anya', format: 'MP4', year: 2000 },
  //   { id: 11, title: 'Anya', format: 'MP4', year: 2000 },
  // ];
  return (

    <Paper className="movieList-wrap" elevation={10}>
      <TextField id="search-field" className="search-field" label="Search" variant="outlined" />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={9}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Paper>
  );
}

export default MovieList;

