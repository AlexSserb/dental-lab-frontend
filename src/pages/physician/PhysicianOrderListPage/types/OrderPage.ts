import OrderBrief from "types/Order";

export type OrderPage = {
    results: OrderBrief[];
    totalPages: number;
};
