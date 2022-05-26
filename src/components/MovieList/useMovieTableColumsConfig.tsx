import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import "./MovieList.scss"
import { IconButton, Paper, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useMovies } from '../../hooks';

const useMovieTableColumnsConfig = () => {
    const { deleteMovie, needUpdate} = useMovies();
    const onDeleteMovie = (id) => {
      deleteMovie(id).then((responseData) => {
        if (responseData?.payload?.status === 1) {
          needUpdate();
        }
      });
    }
  
    const columns: GridColDef[] = [
      { field: 'title', headerName: 'Movie name', width: 300 },
      { field: 'format', type: 'string', headerName: 'Format', width: 200, sortable: false },
      { field: 'year', type: 'number', headerName: 'Year', width: 100 },
      {
        field: 'delete', headerName: '', width: 70, hideSortIcons: true, renderCell: (params) => {
          return (
            <IconButton onClick={() => { onDeleteMovie(params.id) }} aria-label="delete">
              <Delete />
            </IconButton>
          );
        },
      }
    ];
    
    return columns;
  }

  export default useMovieTableColumnsConfig;