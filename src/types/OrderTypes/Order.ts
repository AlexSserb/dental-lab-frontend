import { User } from "types/User";
import OrderStatus from "./OrderStatus";
import { Customer } from "types/CustomerTypes/Customer";

export interface OrderBrief {
    id: string;
    status: OrderStatus;
    orderDate: string;
    cost: number;
    discount: number;
    customer: Customer;
    comment: string;
}

export interface Order extends OrderBrief {
    user: User;
}
