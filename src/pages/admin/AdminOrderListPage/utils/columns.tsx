import { MRT_ColumnDef } from "mantine-react-table";
import TableRow from "../types/TableRow";
import { Link } from "react-router-dom";

const columns: MRT_ColumnDef<TableRow>[] = [
    {
        accessorKey: "order.customer.name",
        header: "Заказчик",
    },
    {
        accessorKey: "user",
        header: "Стоматолог",
        Cell: ({ renderedCellValue, row }) => (
            <Link to="/profile" state={{ email: row.original.order.user.email }}>
                <span>{renderedCellValue}</span>
            </Link>
        ),
    },
    {
        accessorKey: "order.orderDate",
        header: "Дата оформления",
        size: 0,
    },
    {
        accessorKey: "deadline",
        header: "Крайний срок",
    },
    {
        accessorKey: "status",
        header: "Статус",
    },
    {
        accessorKey: "cost",
        header: "Сумма (руб)",
    },
];

export default columns;
