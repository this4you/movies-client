import { MovieListParams } from "@/api/movieApi";
import { useMovies, useAppSelector } from "../../hooks";
import { useState, useEffect } from "react";

const useMovieTableData = ({page, sortParams}, activeSearchValue, pageSize = 9) => {
    const [loading, setLoading] = useState(false);
    const { fetchMovies } = useMovies();
    const { moviesList, isNeedUpdate, totalCount } = useAppSelector((state) => state.movies);
  
  
    const getMovieFetchParam = () => {
      const params = {
        limit: pageSize,
        offset: pageSize * (page),
        sort: sortParams.sort,
        order: sortParams.order
      } as MovieListParams;
  
      if (activeSearchValue) {
        params.search = activeSearchValue;
      }
      return params;
    }
  
    const fetchPageMovies = () => {
      setLoading(true);
      const params = getMovieFetchParam();
      fetchMovies(params)
        .then(() => {
          setLoading(false);
        });
    }
  
    useEffect(() => {
      fetchPageMovies();
    }, [page, sortParams, activeSearchValue]);
  
    return {
      moviesList,
      totalCount,
      loading,
      isNeedUpdate
    };
  }

  export default useMovieTableData;