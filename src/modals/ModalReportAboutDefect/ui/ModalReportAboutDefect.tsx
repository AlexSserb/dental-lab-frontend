import { useState } from "react";
import { Box, Button, Modal, Radio, Stack, Table, Textarea } from "@mantine/core";
import { useDisclosure, useSet } from "@mantine/hooks";
import { Order, OrdersService, Product } from "../../../client";

type Props = {
    order: Order;
    products: Product[];
    refetchOrder: (order: Order) => void;
}

export const ModalReportAboutDefect = ({ order, products, refetchOrder }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [commentAfterAccept, setCommentAfterAccept] = useState<string>("");
    const selectedProductIds = useSet<string>([]);

    const handleCloseModal = () => {
        setCommentAfterAccept("");
        close();
    };

    const onSubmit = () => {
        OrdersService.reportDefect({
            requestBody: {
                order: order.id,
                products: [...selectedProductIds],
                commentAfterAccept,
            },
        })
            .then(() => {
                refetchOrder(order);
                handleCloseModal();
            })
            .catch(err => console.log(err));
    };

    const renderProducts = () => (
        <Table withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td w="10%"></Table.Td>
                    <Table.Td>Тип изделия</Table.Td>
                    <Table.Td w="20%">
                        Кол-во
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {products.map((product) => (
                    <Table.Tr key={product.id}>
                        <Table.Td>
                            <Radio
                                checked={selectedProductIds.has(product.id)}
                                onClick={() => {
                                    if (selectedProductIds.has(product.id)) {
                                        selectedProductIds.delete(product.id);
                                    } else {
                                        selectedProductIds.add(product.id);
                                    }
                                }}
                            />
                        </Table.Td>
                        <Table.Td>
                            {product.productType.name}
                        </Table.Td>
                        <Table.Td>
                            {product.amount}
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );

    return (
        <Stack>
            <Button variant={"outline"} color={"red"} onClick={open}>
                Сообщить о браке
            </Button>
            <Modal opened={opened} onClose={close} title="Сообщение о браке">
                <Stack>
                    <Textarea
                        mb={10}
                        label="Комментарий"
                        value={commentAfterAccept}
                        onChange={event => setCommentAfterAccept(event.target.value)}
                        maxLength={500}
                    />
                    <Box>Выберите бракованые изделия:</Box>
                    {renderProducts()}
                    <Button
                        onClick={onSubmit}
                        mb={10}
                        variant="contained"
                    >
                        Сообщить о браке
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
};
