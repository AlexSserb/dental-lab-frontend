import { Order } from "types/OrderTypes/Order";

type TableRow = {
    customer: string;
    user: string;
    date: string;
    status: string;
    cost: number;
    order: Order;
};

export default TableRow;
