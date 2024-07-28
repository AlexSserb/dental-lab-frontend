import axios, { AxiosResponse } from "axios";
import { LoginData } from "../types/LoginData";

export function postLoginData(data: LoginData): Promise<AxiosResponse> {
    return axios.post("/accounts/token/", {
        email: data.email,
        password: data.password,
    });
}
