import axios, { AxiosResponse } from "axios";
import { FullProduct } from "types/ProductTypes/Product";

const API_URL = "orders/products/";

class ProductService {
    getForOrder(orderId: string) {
        return axios.get(API_URL + orderId);
    }

    getWithOperationsForOrder(
        orderId: string
    ): Promise<AxiosResponse<FullProduct[]>> {
        return axios.get(API_URL + `operations/${orderId}`);
    }
}

const productService = new ProductService();
export default productService;
