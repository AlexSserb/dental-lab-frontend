import React from "react";

export type User = {
    email: string;
    groupId: number;
    isActive: boolean;
    isVerified: boolean;
};

export type AuthTokens = {
    access: string;
    refresh: string;
};

export type UserContextType = {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    authTokens: AuthTokens | undefined;
    setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | undefined>>;
    logoutUser: () => void;
};

export type UserProviderProps = {
    children: React.ReactNode;
};
