import { Table } from "@mantine/core";
import Operation from "types/OperationTypes/Operation";
import { formatTime } from "utils/formatDateTime";

type OperationItemProps = {
    operation: Operation;
};

function OperationItem({ operation }: OperationItemProps) {
    return (
        <Table.Tr key={operation.id}>
            <Table.Td>{operation.ordinalNumber}</Table.Td>
            <Table.Td>{operation.operationType.name}</Table.Td>
            <Table.Td>{formatTime(operation.operationType.execTime)}</Table.Td>
        </Table.Tr>
    );
}

export default OperationItem;
