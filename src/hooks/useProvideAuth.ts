import { useState } from "react";
import { LoginUserModel, RegisterUserModel } from "../models";
import { userActions } from "../redux/userSlice";
import { AUTH_LOCAL_STORAGE_TOKEN } from "../utils/axios";
import { useAppDispatch } from '../hooks';

export type ProvideAuthModel = {
    session: string;
    signUp: Function;
    signIn: Function;
};

const useProvideAuth = (): ProvideAuthModel => {
    const [session, setSession] = useState(localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN));
    const dispatch = useAppDispatch();

    
    const signUp = (registerData: RegisterUserModel) => {
        return dispatch(
            userActions.register(registerData))
            .then(data => {
                const token = data?.payload?.token || "";
                setSession(token);
                return data;
            });
    };

    const signIn = (loginData: LoginUserModel) => {
        return dispatch(
            userActions.login(loginData))
            .then(data => {
                const token = data?.payload?.token || "";
                setSession(token);
                return data;
            });
    };
    return {
        session,
        signUp,
        signIn
    };
}


export default useProvideAuth;

