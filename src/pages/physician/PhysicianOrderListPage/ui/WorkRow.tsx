import { Button, Popover, Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { ToothMarks } from "components/ToothMarks";
import { Order, Work } from "../../../../client";
import MotionEnterDiv from "../../../../components/motionTemplates/MotionEnterDiv.tsx";

type WorkRowProps = {
    work: Work;
    rowIndex: number;
    currOrder: Order | null;
};

export const WorkRow = ({
                               work,
                               rowIndex,
                               currOrder,
                           }: WorkRowProps) => {
    return (
        <Table.Tr key={work.id}>
            <Table.Td>{rowIndex}</Table.Td>
            <Table.Td>{work.workType.name}</Table.Td>
            <Table.Td>{work.workStatus.name}</Table.Td>
            <Table.Td>{work.amount}</Table.Td>
            <Table.Td>{(work.workType.cost ?? 0).toFixed(2)}</Table.Td>
            <Table.Td>{work.discount}%</Table.Td>
            <Table.Td>
                {Math.max(work.discount, currOrder?.discount ?? 0)}%
            </Table.Td>
            <Table.Td>{work.cost.toFixed(2)}</Table.Td>
            <Table.Td>
                <Popover
                    position="bottom-end"
                    offset={{ mainAxis: 0, crossAxis: -50 }}
                    withArrow
                    shadow="md">
                    <Popover.Target>
                        <Button variant="contained">
                            <IconEye />
                        </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <MotionEnterDiv>
                            <ToothMarks teethList={work.teeth} />
                        </MotionEnterDiv>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
        </Table.Tr>
    );
};
