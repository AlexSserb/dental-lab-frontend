import { Button, Table } from "@mantine/core";
import { IconInfoHexagon } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { OrderWithPhysician, Product } from "../../../../client";

type ProductRowProps = {
    product: Product;
    order: OrderWithPhysician | null;
    index: number;
};

export function ProductRow({ product, order, index }: ProductRowProps) {
    const navigate = useNavigate();

    return (
        <Table.Tr key={product.id}>
            <Table.Td>{++index}</Table.Td>
            <Table.Td>{product.productType.name}</Table.Td>
            <Table.Td>{product.productStatus.name}</Table.Td>
            <Table.Td>{product.amount}</Table.Td>
            <Table.Td>{(product.productType.cost ?? 0).toFixed(2)}</Table.Td>
            <Table.Td>{product.discount}%</Table.Td>
            <Table.Td>{order?.discount ?? 0}%</Table.Td>
            <Table.Td>
                {Math.max(product.discount, order?.discount ?? 0)}%
            </Table.Td>
            <Table.Td>{product.cost.toFixed(2)}</Table.Td>
            <Table.Td>
                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/operations-for-product", {
                            state: { product, order },
                        })
                    }>
                    <IconInfoHexagon />
                </Button>
            </Table.Td>
        </Table.Tr>
    );
}
