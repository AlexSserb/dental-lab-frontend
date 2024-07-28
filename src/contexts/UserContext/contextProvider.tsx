import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthTokens, User, UserProviderProps } from "./types";
import { UserContext } from "./context";

function loadAuthTokens(): AuthTokens | undefined {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
        return JSON.parse(authTokens);
    }
}

function loadUser(): User | undefined {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
        console.log(jwtDecode(authTokens));
        return jwtDecode(authTokens);
    }
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [authTokens, setAuthTokens] = useState<AuthTokens | undefined>(
        loadAuthTokens()
    );
    const [user, setUser] = useState<User | undefined>(loadUser());

    const logoutUser = () => {
        setAuthTokens(undefined);
        setUser(undefined);
        localStorage.removeItem("authTokens");
    };

    const updateToken = () => {
        console.log("updateToken");
        axios
            .post("/accounts/token/refresh/", { refresh: authTokens?.refresh })
            .then(res => {
                setAuthTokens(res.data);
                setUser(jwtDecode(res.data.access));
                localStorage.setItem("authTokens", JSON.stringify(res.data));
            })
            .catch(_ => {
                console.log("Failed to update token");
                logoutUser();
            });
    };

    const contextData = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        logoutUser: logoutUser,
    };

    useEffect(() => {
        updateToken();
    }, []);

    useEffect(() => {
        const minutes = 1000 * 60 * 14;
        const interval = setInterval(() => {
            if (localStorage.getItem("authTokens")) {
                updateToken();
                console.log("Token updated successfully");
            }
        }, minutes);
        return () => clearInterval(interval);
    }, [authTokens]);

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
};
