import React, { FC, ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import "./MovieList.scss"
import { IconButton, Paper, TextField } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppSelector, useMovies } from '../../hooks';
import { MovieListParams, SortOrder } from '../../api/movieApi';

type MovieListProps = {}

const defaultSort = 'id';
const defaultOrder = SortOrder.ASC;

const MovieList: FC<MovieListProps> = (): ReactElement => {
  const { fetchMovies, deleteMovie, needUpdate } = useMovies();
  const { moviesList, isNeedUpdate, totalCount } = useAppSelector((state) => state.movies);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [sortParams, setSortParams] = useState({ sort: defaultSort, order: defaultOrder });

  const fetchPageMovies = () => {
    setLoading(true);
    const params = {
      limit: 9,
      offset: 9 * (page),
      sort: sortParams.sort,
      order: sortParams.order
    } as MovieListParams;
    if (search) {
      params.search = search;
    }
    fetchMovies(params)
      .then(() => {
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
  }, [page, sortParams, search]);

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
    { field: 'format', type: 'string', headerName: 'Format', width: 200, sortable: false },
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

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setSortParams({
      order: getOrderType(sortModel[0]?.sort) || defaultOrder,
      sort: sortModel[0]?.field || defaultSort
    })
  }

  const getOrderType = (type: string) => {
    switch (type) {
      case 'asc':
        return SortOrder.ASC;
      case 'desc':
        return SortOrder.DESC;
      default:
        return '';
    }
  }

  const handleChangeSearchValue = (event) => {
    const value = event.target.value;
    if (!value || (value && value.length > 2)) {
      setSearch(value);
    }
  }
  return (

    <Paper className="movieList-wrap" elevation={10}>
      <TextField id="search-field" onChange={handleChangeSearchValue} className="search-field" label="Search" variant="outlined" />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={moviesList}
          columns={columns}
          pageSize={9}
          loading={loading}
          hideFooterSelectedRowCount
          onSortModelChange={handleSortModelChange}
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

