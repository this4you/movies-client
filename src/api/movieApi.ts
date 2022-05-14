import { axios } from "../utils";
import { MovieModel } from "../models";

const movieApi = {
    create: (data: MovieModel) => axios.post('movies', data),
    getAll: () => axios.get('movies')
}

export default movieApi;