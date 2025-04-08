import { Button, Popover, Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { ToothMarks } from "components/ToothMarks";
import { Order, Product } from "../../../../client";
import MotionEnterDiv from "../../../../components/motionTemplates/MotionEnterDiv.tsx";

type ProductRowProps = {
    product: Product;
    rowIndex: number;
    currOrder: Order | null;
};

export const ProductRow = ({
                               product,
                               rowIndex,
                               currOrder,
                           }: ProductRowProps) => {
    return (
        <Table.Tr key={product.id}>
            <Table.Td>{rowIndex}</Table.Td>
            <Table.Td>{product.productType.name}</Table.Td>
            <Table.Td>{product.productStatus.name}</Table.Td>
            <Table.Td>{product.amount}</Table.Td>
            <Table.Td>{(product.productType.cost ?? 0).toFixed(2)}</Table.Td>
            <Table.Td>{product.discount}%</Table.Td>
            <Table.Td>
                {Math.max(product.discount, currOrder?.discount ?? 0)}%
            </Table.Td>
            <Table.Td>{product.cost.toFixed(2)}</Table.Td>
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
                            <ToothMarks teethList={product.teeth} />
                        </MotionEnterDiv>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
        </Table.Tr>
    );
};
