import axios, { AxiosResponse } from "axios";
import ProductType from "types/ProductTypes/ProductType";

const API_URL = "api/product-types/";

class ProductTypesService {
    getAll(): Promise<AxiosResponse<ProductType[]>> {
        return axios.get(API_URL);
    }
}

const productTypesService = new ProductTypesService();
export default productTypesService;
