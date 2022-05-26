import React, { FC, ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridSortModel } from '@mui/x-data-grid';
import "./MovieList.scss"
import { Paper, TextField } from '@mui/material';
import { useSearch } from '../../hooks';
import { SortOrder } from '../../api/movieApi';
import { useNavigate } from "react-router-dom";
import useMovieTableColumnsConfig from './useMovieTableColumsConfig';
import useMovieTableData from './useMovieTableData';

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
const defaultSort = 'id';
const defaultOrder = SortOrder.ASC;



const MovieList = () => {
  const { setSearch, activeSearchValue } = useSearch();
  const [filterParams, setFilterParams] = useState({
    page: 0,
    sortParams: { sort: defaultSort, order: defaultOrder }
  });

  const { moviesList, totalCount, loading, isNeedUpdate } = useMovieTableData(filterParams, activeSearchValue);

  useEffect(() => {
    if (isNeedUpdate) {
      setFilterParams({
        page: 0,
        sortParams: { sort: defaultSort, order: defaultOrder }
      });
    }
  }, [isNeedUpdate])

  const columns = useMovieTableColumnsConfig();
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setFilterParams({ ...filterParams, page });
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    setFilterParams({
      ...filterParams,
      sortParams: {
        order: getOrderType(sortModel[0]?.sort) || defaultOrder,
        sort: sortModel[0]?.field || defaultSort
      }
    });
  }

  const handleChangeSearchValue = (event) => {
    const value = event.target.value;
    if (!value || (value && value.length > 2)) {
      setSearch(value);
    }
  }

  const handleRowDoubleClick = ({ id }) => {
    navigate(`${id}`);
  }

  return (

    <Paper className="movieList-wrap" elevation={10}>
      <TextField id="search-field" onChange={handleChangeSearchValue} className="search-field" label="Search" variant="outlined" />
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          disableColumnMenu={true}
          onRowDoubleClick={handleRowDoubleClick}
          rows={moviesList}
          columns={columns}
          pageSize={9}
          loading={loading}
          hideFooterSelectedRowCount
          onSortModelChange={handleSortModelChange}
          sortingMode='server'
          page={filterParams.page}
          paginationMode="server"
          rowCount={totalCount}
          onPageChange={handlePageChange}
        />
      </div>
    </Paper>
  );
}

export default MovieList;

