import axios, { AxiosResponse } from "axios";
import { Customer } from "types/CustomerTypes/Customer";

const API_URL = "accounts/";

class CustomerService {
    getAll(): Promise<AxiosResponse<Customer[]>> {
        return axios.get(API_URL + `customers`);
    }
}

const customerService = new CustomerService();

export default customerService;
