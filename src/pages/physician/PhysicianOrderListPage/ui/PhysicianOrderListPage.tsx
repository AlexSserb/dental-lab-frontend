import { IconInfoSquare } from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";

import {
    Button,
    Center,
    Flex,
    Pagination,
    Paper,
    ScrollArea,
    Stack,
    Table,
    TextInput,
    Title,
} from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import styles from "pages/physician/PhysicianOrderListPage/styles/PhysicianOrderListStyles.module.css";
import usePhysicianOrderList from "../hooks/usePhysicianOrderList";
import { ProductRow } from "./ProductRow";

export const PhysicianOrderListPage = () => {
    const {
        orders,
        page,
        totalPages,
        products,
        currOrder,
        handleChangePage,
        getOrderInfo,
    } = usePhysicianOrderList();
    const navigate = useNavigate();

    // Main variable to render orders on the screen
    const renderOrders = () => {
        let i = 1;
        return orders.map(order => (
            <Table.Tr key={order.id}>
                <Table.Td>{i++}</Table.Td>
                <Table.Td className={styles.noWrapDash}>
                    {order?.orderDate}
                </Table.Td>
                <Table.Td>{order.status.name}</Table.Td>
                <Table.Td>
                    <Button onClick={() => getOrderInfo(order)}>
                        <IconInfoSquare />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    const renderProducts = () => {
        return products.map((product, index) => (
            <ProductRow
                product={product}
                rowIndex={index + 1}
                currOrder={currOrder}
            />
        ));
    };

    const textInputStyle = {
        w: "100%",
        readOnly: true,
    };

    return (
        <Flex gap={10} direction={{ base: "column", sm: "row" }}>
            <RoundedBoxContainer>
                <Flex direction="column">
                    <Title mx={15} order={2}>
                        Заказы
                    </Title>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate("/create-order");
                        }}
                        m={15}
                        w="50%">
                        Оформить заказ
                    </Button>
                    {orders.length > 0 ? (
                        <Stack align="center" m={20}>
                            <Paper>
                                <Table withTableBorder withColumnBorders>
                                    <Table.Thead>
                                        <Table.Tr>
                                            <Table.Th>№</Table.Th>
                                            <Table.Th>Дата</Table.Th>
                                            <Table.Th>Статус</Table.Th>
                                            <Table.Th></Table.Th>
                                        </Table.Tr>
                                    </Table.Thead>
                                    <Table.Tbody>{renderOrders()}</Table.Tbody>
                                </Table>
                            </Paper>
                            <Pagination
                                total={totalPages}
                                value={page}
                                onChange={handleChangePage}
                                mt={10}
                            />
                        </Stack>
                    ) : (
                        <Center>
                            <Paper m={20} p={20}>
                                Нет заказов
                            </Paper>
                        </Center>
                    )}
                </Flex>
            </RoundedBoxContainer>
            <RoundedBoxContainer>
                <Flex direction="column">
                    <Center>
                        <Title mb={20} order={2}>
                            Информация о заказе
                        </Title>
                    </Center>
                    <Stack gap={15}>
                        {products.length > 0 ? (
                            <Paper>
                                <ScrollArea scrollbars="x">
                                    <Table withTableBorder withColumnBorders>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Td>№</Table.Td>
                                                <Table.Td>Тип изделия</Table.Td>
                                                <Table.Td>Статус</Table.Td>
                                                <Table.Td w="10%">
                                                    Кол-во
                                                </Table.Td>
                                                <Table.Td>Цена</Table.Td>
                                                <Table.Td>
                                                    Скидка на изделие
                                                </Table.Td>
                                                <Table.Td>Рез. скидка</Table.Td>
                                                <Table.Td>Сумма</Table.Td>
                                                <Table.Td>Отметки</Table.Td>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {renderProducts()}
                                        </Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Paper>
                        ) : (
                            <p>Изделия для заказа</p>
                        )}
                        <Flex
                            direction={{ base: "column", sm: "row" }}
                            gap={10}>
                            <TextInput
                                {...textInputStyle}
                                label="Статус"
                                value={currOrder?.status?.name}
                            />
                            <TextInput
                                {...textInputStyle}
                                label="Заказчик"
                                value={currOrder?.customer?.name ?? ""}
                            />
                            <TextInput
                                {...textInputStyle}
                                label="Дата"
                                value={currOrder?.orderDate ?? ""}
                            />
                        </Flex>
                        <Flex direction={{ base: "column", sm: "row" }}>
                            <TextInput
                                {...textInputStyle}
                                label="Сумма заказа (руб)"
                                value={currOrder?.cost?.toFixed(2)}
                            />
                            <TextInput
                                {...textInputStyle}
                                mx={10}
                                label="Скидка"
                                value={(currOrder?.discount ?? 0) + "%"}
                            />
                            <TextInput
                                {...textInputStyle}
                                label="Итоговая сумма заказа (руб)"
                                value={(
                                    (currOrder?.cost ?? 0) *
                                    (1 - (currOrder?.discount ?? 0) / 100)
                                ).toFixed(2)}
                            />
                        </Flex>
                    </Stack>
                </Flex>
            </RoundedBoxContainer>
        </Flex>
    );
};
