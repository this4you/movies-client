import { createContext, useEffect, useState } from "react";
import { RegisterUserModel } from "../models";
import { userActions } from "../redux/actions";
import { AUTH_LOCAL_STORAGE_TOKEN } from "./axios";
import { useAppDispatch } from './hooks';

export type ProvideAuthModel = {
    session: string;
    signUp: Function;
};

const useProvideAuth = (): ProvideAuthModel => {
    const [session, setSession] = useState(localStorage.getItem(AUTH_LOCAL_STORAGE_TOKEN));
    const dispatch = useAppDispatch();

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signUp = (registerData: RegisterUserModel) => {
        return dispatch(
            userActions.register(registerData))
            .then(data => {
                const token = data?.payload?.token || "";
                setSession(token);
                return data;
            });
    };
    return {
        session,
        signUp
    };
}


export default useProvideAuth;

