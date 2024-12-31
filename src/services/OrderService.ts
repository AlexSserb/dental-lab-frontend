import axios, { AxiosResponse } from "axios";
import { Order } from "types/OrderTypes/Order";
import Product, { ProductBrief } from "types/ProductTypes/Product";
import OrderStatus from "../types/OrderTypes/OrderStatus.ts";

const API_URL = "orders/";

class OrderService {
    getOrders(month: number, year: number): Promise<AxiosResponse<Order[]>> {
        return axios.get(API_URL + `orders/${year}/${month}`);
    }

    post(products: ProductBrief[], customerId: string, comment: string) {
        return axios.post(API_URL + "create-order/", {
            customerId: customerId,
            productTypes: products,
            comment,
        });
    }

    // Administrator confirm the order and set the final discounts
    confirmOrder(order: Order, products: Product[]) {
        return axios.post(API_URL + "confirm-order/", {
            order: order,
            products: products,
        });
    }

    getOrderStatuses(): Promise<AxiosResponse<OrderStatus[]>> {
        return axios.get(API_URL + "order-statuses/");
    }

    setOrderStatus(orderId: string, statusId: string) {
        return axios.patch(API_URL + `set-order-status/${orderId}`, {
            status: statusId,
        });
    }
}

const orderService = new OrderService();
export default orderService;
