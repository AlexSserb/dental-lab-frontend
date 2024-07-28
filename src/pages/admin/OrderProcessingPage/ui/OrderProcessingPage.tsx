import {
    Button,
    Center,
    Divider,
    Group,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { DiscountInput } from "components/DiscountInput";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useOrderProcessing from "../hooks/useOrderProcessing";
import { getOrderCost, getProductCost } from "../utils/getCost";
import OperationItem from "./OperationItem";
import { TransparentContainer } from "components/TransparentContainer";

const blockStyle = {
    padding: 2,
    gap: "xs",
};

export const OrderProcessingPage = () => {
    const {
        order,
        products,
        curProdIdx,
        setCurProdIdx,
        submitOrder,
        handleOrderDiscountChanged,
        handleProductDiscountChanged,
    } = useOrderProcessing();

    const renderProducts = () => {
        return products.map((product, index) => (
            <Table.Tr key={product.id}>
                <Table.Td>{product.productType.name}</Table.Td>
                <Table.Td>{getProductCost(product, order).toFixed(2)}</Table.Td>
                <Table.Td>
                    <Button
                        variant="contained"
                        onClick={() => setCurProdIdx(index)}>
                        <IconInfoCircle />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    const renderOperations = () => {
        return products[curProdIdx].operations.map(operation => (
            <OperationItem operation={operation} key={operation.id} />
        ));
    };

    const renderOrder = () => {
        return (
            <RoundedBoxContainer>
                <Stack style={blockStyle}>
                    <Center>
                        <Title order={4}>
                            <b>Информация о заказе</b>
                        </Title>
                    </Center>
                    <Divider />
                    <Text>
                        Заказчик:{" "}
                        {order?.user?.lastName + " " + order?.user?.firstName}
                    </Text>
                    <Text>Дата оформления: {order?.orderDate}</Text>
                    <Text>
                        Сумма заказа: {getOrderCost(products, order).toFixed(2)}{" "}
                        руб.
                    </Text>
                    <Group align="center">
                        <Text>Скидка (%):</Text>
                        <DiscountInput
                            onChange={handleOrderDiscountChanged}
                            value={order?.discount}
                        />
                    </Group>
                    <Text>
                        Итоговая сумма заказа:{" "}
                        {(
                            (order?.cost ?? 0) *
                            (1 - (order?.discount ?? 0) / 100)
                        ).toFixed(2)}{" "}
                        руб.
                    </Text>
                    <Button variant="contained" onClick={submitOrder}>
                        Оформить наряд
                    </Button>
                    <Divider />
                    <Center>
                        <Text>
                            <b>Список изделий</b>
                        </Text>
                    </Center>
                    <Divider />
                    {products.length > 0 ? (
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>Тип изделия</Table.Td>
                                    <Table.Td>Итоговая сумма (руб)</Table.Td>
                                    <Table.Td></Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderProducts()}</Table.Tbody>
                        </Table>
                    ) : (
                        <p>Информации об изделиях нет</p>
                    )}
                </Stack>
            </RoundedBoxContainer>
        );
    };

    const renderProduct = () => {
        return (
            <RoundedBoxContainer>
                <Stack style={blockStyle}>
                    <Center>
                        <Title order={4}>
                            <b>Информация об изделии</b>
                        </Title>
                    </Center>
                    <Divider />
                    {products.length > 0 ? (
                        <>
                            <Text>
                                Тип изделия:{" "}
                                {products[curProdIdx].productType.name}
                            </Text>
                            <Text>
                                Стоимость 1-го изделия:{" "}
                                {products[curProdIdx].productType.cost.toFixed(
                                    2
                                )}{" "}
                                руб.
                            </Text>
                            <Text>
                                Количество: {products[curProdIdx].amount}
                            </Text>
                            <Text>
                                Сумма:{" "}
                                {(
                                    products[curProdIdx].productType.cost *
                                    products[curProdIdx].amount
                                ).toFixed(2)}{" "}
                                руб.
                            </Text>
                            <Group align="center">
                                <Text>Скидка на изделие (%):</Text>
                                <DiscountInput
                                    onChange={handleProductDiscountChanged}
                                    value={products[curProdIdx].discount}
                                />
                            </Group>
                            <Text>
                                Результирующая скидка (%):{" "}
                                {Math.max(
                                    products[curProdIdx].discount,
                                    order?.discount ?? 0
                                )}
                            </Text>
                            <Text>
                                Итоговая сумма:{" "}
                                {getProductCost(
                                    products[curProdIdx],
                                    order
                                ).toFixed(2)}{" "}
                                руб.
                            </Text>
                        </>
                    ) : (
                        <Center>
                            <Text>Нет изделий в заказе</Text>
                        </Center>
                    )}
                    <Divider />
                    <Center>
                        <Text>
                            <b>Список операций</b>
                        </Text>
                    </Center>
                    <Divider />
                    {products.length > 0 &&
                    products[curProdIdx]?.operations.length > 0 ? (
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>Тип операции</Table.Td>
                                    <Table.Td>Время выполнения</Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderOperations()}</Table.Tbody>
                        </Table>
                    ) : (
                        <Center>
                            <Text>Информации об операциях нет</Text>
                        </Center>
                    )}
                </Stack>
            </RoundedBoxContainer>
        );
    };

    return (
        <TransparentContainer>
            {renderOrder()}
            {renderProduct()}
        </TransparentContainer>
    );
};
