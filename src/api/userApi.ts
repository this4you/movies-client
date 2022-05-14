import {axios} from "../utils";
import { LoginUserModel, RegisterUserModel } from "../models";

const userApi = {
    signUp : (data: RegisterUserModel) => axios.post('users', data),
    signIn : (data: LoginUserModel) => axios.post('sessions', data),
}

export default userApi;