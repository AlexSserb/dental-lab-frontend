import axios, { AxiosResponse } from "axios";
import { RegistrationData } from "../types/RegistrationData";

export function postRegistrationData(
    data: RegistrationData
): Promise<AxiosResponse> {
    return axios.post("/accounts/register/", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        customers: data.customers,
    });
}
