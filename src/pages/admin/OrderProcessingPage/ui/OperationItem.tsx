import { Table } from "@mantine/core";
import { formatStrTime } from "utils/formatDateTime";
import { OperationForWork } from "../../../../client";

type OperationItemProps = {
    operation: OperationForWork;
};

function OperationItem({ operation }: OperationItemProps) {
    return (
        <Table.Tr key={operation.id}>
            <Table.Td>{operation.ordinalNumber}</Table.Td>
            <Table.Td>{operation.operationType.name}</Table.Td>
            <Table.Td>{formatStrTime(operation.execTime)}</Table.Td>
        </Table.Tr>
    );
}

export default OperationItem;
