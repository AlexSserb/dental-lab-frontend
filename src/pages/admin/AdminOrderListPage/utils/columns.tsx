import { MRT_ColumnDef } from "mantine-react-table";
import TableRow from "../types/TableRow";

const columns: MRT_ColumnDef<TableRow>[] = [
    {
        accessorKey: "user",
        header: "Стоматолог",
    },
    {
        accessorKey: "date",
        header: "Дата оформления",
    },
    {
        accessorKey: "status",
        header: "Статус",
    },
    {
        accessorKey: "discount",
        header: "Скидка (%)",
    },
    {
        accessorKey: "cost",
        header: "Сумма (руб)",
    },
];

export default columns;
