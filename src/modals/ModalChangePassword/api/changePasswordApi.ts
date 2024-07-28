import axios, { AxiosResponse } from "axios";

export function postChangePassword(
    oldPassword: string,
    newPassword: string
): Promise<AxiosResponse> {
    return axios.post("/accounts/password-change/", {
        oldPassword: oldPassword,
        newPassword: newPassword,
    });
}
