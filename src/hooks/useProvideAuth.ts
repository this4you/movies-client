import { useState } from "react";
import { LoginUserModel, RegisterUserModel } from "../models";
import { userActions } from "../redux/userSlice";
import { AUTH_LOCAL_STORAGE_TOKEN } from "../providers";
import { useAppDispatch } from '../hooks';

export type ProvideAuthModel = {
    session: string;
    signUp: Function;
    signIn: Function;
    logOut: Function;
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

    const logOut = () => {
        setSession("");
        localStorage.setItem(AUTH_LOCAL_STORAGE_TOKEN, "");
    }

    return {
        session,
        signUp,
        signIn,
        logOut
    };
}


export default useProvideAuth;

