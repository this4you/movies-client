import { axios } from "../providers";
import { MovieModel } from "../models";

export type MovieListParams = {
    limit: number,
    offset: number
};

const importMovie = (file) => {
    var formData = new FormData();
    formData.append("movies", file);
    return axios.post('movies/import', formData);
};


const movieApi = {
    create: (data: MovieModel) => axios.post('movies', data),
    getAll: (params?: MovieListParams) => axios.get('movies', { params }),
    import: importMovie
}

export default movieApi;