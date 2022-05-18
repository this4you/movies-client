import { axios } from "../providers";
import { MovieModel } from "../models";

const importMovie = (file) => {
    var formData = new FormData();
    formData.append("movies", file);
    return axios.post('movies/import', formData);
};


const movieApi = {
    create: (data: MovieModel) => axios.post('movies', data),
    getAll: () => axios.get('movies'),
    import: importMovie
}

export default movieApi;