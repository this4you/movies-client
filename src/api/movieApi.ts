import { axios } from "../providers";
import { MovieModel } from "../models";

const URL_ENDPOINT = 'movies';
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
    create: (data: MovieModel) => axios.post(URL_ENDPOINT, data),
    delete: (id: string) => axios.delete(`${URL_ENDPOINT}/${id}`),
    getAll: (params?: MovieListParams) => axios.get(URL_ENDPOINT, { params }),
    import: importMovie
}

export default movieApi;