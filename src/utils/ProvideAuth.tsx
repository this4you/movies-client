import React, { useState, useEffect, useContext, createContext } from "react";
import useProvideAuth from "./useProvideAuth";
import {ProvideAuthModel} from './useProvideAuth';

const authContext = createContext({} as ProvideAuthModel);

export const useAuth = () => {
    return useContext(authContext);
};

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}