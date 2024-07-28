import { User } from "types/User";
import OrderStatus from "./OrderStatus";

export interface Order {
    id: string;
    status: OrderStatus;
    user: User;
    orderDate: string;
    cost: number;
    discount: number;
}

export interface OrderBrief {
    id: string;
    status: OrderStatus;
    orderDate: string;
    cost: number;
    discount: number;
}
