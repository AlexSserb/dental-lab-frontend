import { Order } from "types/OrderTypes/Order";

type TableRow = {
    user: string;
    date: string;
    status: string;
    discount: number;
    cost: number;
    order: Order;
};

export default TableRow;
