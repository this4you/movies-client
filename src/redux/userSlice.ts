import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userApi } from "../api"
import { RegisterUserModel, LoginUserModel } from "../models"
import { AUTH_LOCAL_STORAGE_TOKEN } from "../utils/axios"


const register = createAsyncThunk(
    'user/singUp',
    async (model: RegisterUserModel) => {
        const response = await userApi.signUp(model)
        const token = response?.data?.token;
        if (token) {
            localStorage.setItem(AUTH_LOCAL_STORAGE_TOKEN, token);
        }
        return response.data
    }
)

const login = createAsyncThunk(
    'user/login',
    async (model: LoginUserModel) => {
        const response = await userApi.signIn(model)
        const token = response?.data?.token;
        if (token) {
            localStorage.setItem(AUTH_LOCAL_STORAGE_TOKEN, token);
        }
        return response.data
    }
)

const initialState = {};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {})
    },
})

export const userReducer = usersSlice.reducer;
export const userActions = {
    register,
    login 
};
