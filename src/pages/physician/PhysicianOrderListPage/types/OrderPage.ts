import { OrderBrief } from "../../../../types/OrderTypes/Order.ts";


export type OrderPage = {
    results: OrderBrief[];
    totalPages: number;
};
