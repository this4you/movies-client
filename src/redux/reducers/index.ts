import { userReducer } from "../slices/userSlice";
import moviesReducer from "./moviesReducer";
 
const redux =  {
    movies: moviesReducer,
    user: userReducer
}

export default redux;