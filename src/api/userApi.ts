import {axios} from "../utils";
import { RegisterUserModel } from "../models";

const userApi = {
    singUp : (data: RegisterUserModel) => axios.post('users', data)
}

export default userApi;