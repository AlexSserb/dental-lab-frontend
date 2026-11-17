import { MRT_ColumnDef } from "mantine-react-table";
import { Badge } from "@mantine/core";
import TableRow from "../types/TableRow";
import { DECISION_LABELS, TriageStateBadge } from "utils/defectTriage";

const columns: MRT_ColumnDef<TableRow>[] = [
    {
        accessorKey: "createdAt",
        header: "Создано",
        size: 0,
    },
    {
        accessorKey: "comment",
        header: "Сообщение врача",
    },
    {
        accessorKey: "state",
        header: "Состояние",
        Cell: ({ row }) => <TriageStateBadge state={row.original.state} />,
    },
    {
        accessorKey: "revisions",
        header: "Пересмотры",
        size: 0,
        Cell: ({ renderedCellValue }) => <Badge variant="outline">{renderedCellValue}</Badge>,
    },
    {
        accessorKey: "decision",
        header: "Решение",
        Cell: ({ row }) =>
            row.original.decision ? <span>{DECISION_LABELS[row.original.decision]}</span> : null,
    },
];

export default columns;
