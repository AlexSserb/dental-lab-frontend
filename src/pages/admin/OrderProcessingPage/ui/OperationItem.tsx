import { Table } from "@mantine/core";
import { formatStrTime } from "utils/formatDateTime";
import { OperationForProduct } from "../../../../client";

type OperationItemProps = {
    operation: OperationForProduct;
};

function OperationItem({ operation }: OperationItemProps) {
    return (
        <Table.Tr key={operation.id}>
            <Table.Td>{operation.ordinalNumber}</Table.Td>
            <Table.Td>{operation.operationType.name}</Table.Td>
            <Table.Td>{formatStrTime(operation.operationType.execTime)}</Table.Td>
        </Table.Tr>
    );
}

export default OperationItem;
