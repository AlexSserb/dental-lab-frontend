import { useContext } from "react";
import { UserContext } from "./context";


export const useUserContext = () => {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a UserContext");
    }

    return user;
};
