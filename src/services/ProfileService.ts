import axios, { AxiosResponse } from "axios";

const API_URL = "accounts/";

class ProfileService {
    getProfileData(email: string): Promise<AxiosResponse> {
        return axios.get(API_URL + `profile/${email}`);
    }

    patchUserFirstName(
        email: string,
        firstName: string
    ): Promise<AxiosResponse> {
        return axios.patch(
            API_URL + `profile/edit-first-name/${email}/${firstName}`
        );
    }

    patchUserLastName(email: string, lastName: string): Promise<AxiosResponse> {
        return axios.patch(
            API_URL + `profile/edit-last-name/${email}/${lastName}`
        );
    }

    getTechnicians(group_id: number): Promise<AxiosResponse> {
        return axios.get(API_URL + `technicians/${group_id}`);
    }

    attachCustomers(customers: string[]): Promise<AxiosResponse> {
        return axios.post(API_URL + `customers/attach`, {
            customers: customers,
        });
    }
}

const profileService = new ProfileService();
export default profileService;
