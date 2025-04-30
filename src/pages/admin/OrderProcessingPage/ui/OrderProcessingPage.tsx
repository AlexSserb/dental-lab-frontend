import { Button, Center, Divider, Group, Stack, Table, Text, Title } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { DiscountInput } from "components/DiscountInput";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useOrderProcessing from "../hooks/useOrderProcessing";
import { getOrderCost, getWorkCost } from "../utils/getCost";
import OperationItem from "./OperationItem";
import { TransparentContainer } from "components/TransparentContainer";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

const blockStyle = {
    padding: 2,
    gap: "xs",
};

export const OrderProcessingPage = () => {
    const {
        works,
        curWorkIdx,
        setCurWorkIdx,
        submitOrder,
        handleOrderDiscountChanged,
        handleWorkDiscountChanged,
    } = useOrderProcessing();

    const { selectedOrder: order } = useOrdersContext();

    const renderWorks = () => {
        return works.map((work, index) => (
            <Table.Tr key={work.id}>
                <Table.Td>{work.workType.name}</Table.Td>
                <Table.Td>{getWorkCost(work, order).toFixed(2)}</Table.Td>
                <Table.Td w={1}>
                    <Button
                        variant="contained"
                        onClick={() => setCurWorkIdx(index)}>
                        <IconInfoCircle />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    const renderOperations = () => {
        return works[curWorkIdx].operations
            .sort((a, b) => a.ordinalNumber - b.ordinalNumber)
            .map(operation => (
                <OperationItem operation={operation} key={operation.id} />
            ));
    };

    const renderOrder = () => {
        return (
            <RoundedBoxContainer>
                <Stack style={blockStyle}>
                    <TitleWithBackButton
                        title={"Информация о заказе"}
                        backRef={"/order"}
                        titleOrder={4}
                    />
                    <Text>
                        Заказчик:{" "}
                        {order?.user?.lastName + " " + order?.user?.firstName}
                    </Text>
                    <Text>Дата оформления: {order?.orderDate}</Text>
                    <Text>
                        Сумма заказа: {getOrderCost(works, order).toFixed(2)}{" "}
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
                            <b>Список работ</b>
                        </Text>
                    </Center>
                    <Divider />
                    {works.length > 0 ? (
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>Тип работы</Table.Td>
                                    <Table.Td>Итоговая сумма (руб)</Table.Td>
                                    <Table.Td></Table.Td>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{renderWorks()}</Table.Tbody>
                        </Table>
                    ) : (
                        <p>Информации о работах нет</p>
                    )}
                </Stack>
            </RoundedBoxContainer>
        );
    };

    const renderWork = () => {
        return (
            <RoundedBoxContainer>
                <Stack style={blockStyle}>
                    <Center>
                        <Title order={4}>
                            <b>Информация о работе</b>
                        </Title>
                    </Center>
                    <Divider />
                    {works.length > 0 ? (
                        <>
                            <Text>
                                Тип работы:{" "}
                                {works[curWorkIdx].workType.name}
                            </Text>
                            <Text>
                                Стоимость 1-ой работы:{" "}
                                {works[curWorkIdx].workType.cost?.toFixed(
                                    2,
                                )}{" "}
                                руб.
                            </Text>
                            <Text>
                                Количество: {works[curWorkIdx].amount}
                            </Text>
                            <Text>
                                Сумма:{" "}
                                {(
                                    (works[curWorkIdx].workType.cost ?? 0) *
                                    works[curWorkIdx].amount
                                ).toFixed(2)}{" "}
                                руб.
                            </Text>
                            <Group align="center">
                                <Text>Скидка на работу (%):</Text>
                                <DiscountInput
                                    onChange={handleWorkDiscountChanged}
                                    value={works[curWorkIdx].discount}
                                />
                            </Group>
                            <Text>
                                Результирующая скидка (%):{" "}
                                {Math.max(
                                    works[curWorkIdx].discount,
                                    order?.discount ?? 0,
                                )}
                            </Text>
                            <Text>
                                Итоговая сумма:{" "}
                                {getWorkCost(
                                    works[curWorkIdx],
                                    order,
                                ).toFixed(2)}{" "}
                                руб.
                            </Text>
                        </>
                    ) : (
                        <Center>
                            <Text>Нет работ в заказе</Text>
                        </Center>
                    )}
                    <Divider />
                    <Center>
                        <Text>
                            <b>Список операций</b>
                        </Text>
                    </Center>
                    <Divider />
                    {works.length > 0 &&
                    works[curWorkIdx]?.operations.length > 0 ? (
                        <Table withTableBorder withColumnBorders>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Td>№</Table.Td>
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
            {renderWork()}
        </TransparentContainer>
    );
};
