import { Button, Paper, Popover, Table } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import { ToothMarks } from "components/ToothMarks";
import { OrderBrief } from "types/OrderTypes/Order";
import Product from "types/ProductTypes/Product";

type ProductRowProps = {
    product: Product;
    rowIndex: number;
    currOrder: OrderBrief | null;
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
            <Table.Td>{product.productType.cost.toFixed(2)}</Table.Td>
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
                        <Paper>
                            <ToothMarks teethList={product.teeth} />
                        </Paper>
                    </Popover.Dropdown>
                </Popover>
            </Table.Td>
        </Table.Tr>
    );
};
