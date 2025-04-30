import { Button, Table } from "@mantine/core";
import { IconInfoHexagon } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { OrderWithPhysician, Work } from "../../../../client";

type WorkRowProps = {
    work: Work;
    order: OrderWithPhysician | null;
    index: number;
};

export function WorkRow({ work, order, index }: WorkRowProps) {
    const navigate = useNavigate();

    return (
        <Table.Tr key={work.id}>
            <Table.Td>{++index}</Table.Td>
            <Table.Td>{work.workType.name}</Table.Td>
            <Table.Td>{work.workStatus.name}</Table.Td>
            <Table.Td>{work.amount}</Table.Td>
            <Table.Td>{(work.workType.cost ?? 0).toFixed(2)}</Table.Td>
            <Table.Td>{work.discount}%</Table.Td>
            <Table.Td>{order?.discount ?? 0}%</Table.Td>
            <Table.Td>
                {Math.max(work.discount, order?.discount ?? 0)}%
            </Table.Td>
            <Table.Td>{work.cost.toFixed(2)}</Table.Td>
            <Table.Td>
                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/operations-for-work", {
                            state: { work: work, order },
                        })
                    }>
                    <IconInfoHexagon />
                </Button>
            </Table.Td>
        </Table.Tr>
    );
}
