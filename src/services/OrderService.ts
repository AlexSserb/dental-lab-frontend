import axios, { AxiosResponse } from "axios";
import { Order } from "types/OrderTypes/Order";
import Product, { ProductBrief } from "types/ProductTypes/Product";

const API_URL = "api/";

class OrderService {
    getOrders(month: number, year: number): Promise<AxiosResponse<Order[]>> {
        return axios.get(API_URL + `orders/${year}/${month}`);
    }

    post(products: ProductBrief[]) {
        return axios.post(API_URL + "create-order/", {
            productTypes: products,
        });
    }

    // Administrator confirm the order and set the final discounts
    confirmOrder(order: Order, products: Product[]) {
        return axios.post(API_URL + "confirm-order/", {
            order: order,
            products: products,
        });
    }
}

const orderService = new OrderService();
export default orderService;
