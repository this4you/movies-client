import React, { createContext } from "react";
import { useProvideAuth } from "../hooks";
import { ProvideAuthModel } from '../hooks/useProvideAuth';

export const authContext = createContext({} as ProvideAuthModel);

const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default ProvideAuth;