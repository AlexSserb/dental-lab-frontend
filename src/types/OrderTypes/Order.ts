import { User } from "types/User";
import OrderStatus from "./OrderStatus";
import { Customer } from "types/CustomerTypes/Customer";

export interface Order {
    id: string;
    status: OrderStatus;
    user: User;
    orderDate: string;
    cost: number;
    discount: number;
    customer: Customer;
}

export interface OrderBrief {
    id: string;
    status: OrderStatus;
    orderDate: string;
    cost: number;
    discount: number;
    customer: Customer;
}
