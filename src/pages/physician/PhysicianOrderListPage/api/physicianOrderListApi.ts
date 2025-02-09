import axios, { AxiosResponse } from "axios";
import { OrderPage } from "../types/OrderPage";
import Product from "../../../../types/ProductTypes/Product.ts";

export function getOrdersForUser(
    page: number
): Promise<AxiosResponse<OrderPage>> {
    return axios.get(`/orders/orders-for-physician/?page=${page}`);
}

export function getProductsForOrder(
    id: string
): Promise<AxiosResponse<Product[]>> {
    return axios.get(`/products/${id}`);
}
