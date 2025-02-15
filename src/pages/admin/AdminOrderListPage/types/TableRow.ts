import { OrderWithPhysician } from "../../../../client";

type TableRow = {
    customer: string;
    user: string;
    date: string;
    status: string;
    cost: number;
    order: OrderWithPhysician;
};

export default TableRow;
