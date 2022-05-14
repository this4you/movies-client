import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userApi } from "../../api"
import { RegisterUserModel } from "../../models"
import { AUTH_LOCAL_STORAGE_TOKEN } from "../../utils/axios"


const register = createAsyncThunk(
    'user/singUp',
    async (model: RegisterUserModel) => {
        const response = await userApi.singUp(model)
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
    register  
};
