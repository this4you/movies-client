import { useContext } from "react";
import { authContext } from "../providers/ProvideAuth";

const useAuth = () => {
    return useContext(authContext);
};

export default useAuth;