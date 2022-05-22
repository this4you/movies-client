import React, { FC, ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "./MovieList.scss"
import { IconButton, Paper, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppSelector, useMovies } from '../../hooks';

type MovieListProps = {}


const MovieList: FC<MovieListProps> = (): ReactElement => {
  const { fetchMovies, deleteMovie, needUpdate } = useMovies();
  const { moviesList, isNeedUpdate, totalCount } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPageMovies = () => {
    setLoading(true);
    fetchMovies({ limit: 9, offset: 9 * (page) }).then(() => {
      setLoading(false);
    });
  }

  const onDeleteMovie = (id) => {
    deleteMovie(id).then((responseData) => {
      if (responseData?.payload?.status === 1) {
        needUpdate();
      }
    });
  }

  useEffect(() => {
    fetchPageMovies();
  }, [page]);

  useEffect(() => {
    if (!isNeedUpdate) return;

    if (page) {
      setPage(0);
    } else {
      fetchPageMovies();
    }

  }, [isNeedUpdate]);

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Movie name', width: 300 },
    { field: 'format', type: 'string', headerName: 'Format', width: 200 },
    { field: 'year', type: 'number', headerName: 'Year', width: 100 },
    {
      field: 'delete', headerName: '', width: 70, renderCell: (params) => {
        return (
          <IconButton onClick={() => { onDeleteMovie(params.id) }} aria-label="delete">
            <Delete />
          </IconButton>
        );
      },
    }
  ];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };


  return (

    <Paper className="movieList-wrap" elevation={10}>
      <TextField id="search-field" className="search-field" label="Search" variant="outlined" />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={moviesList}
          columns={columns}
          pageSize={9}
          loading={loading}
          page={page}
          paginationMode="server"
          rowCount={totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </Paper>
  );
}

export default MovieList;

