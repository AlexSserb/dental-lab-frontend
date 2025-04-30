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
    Textarea,
    TextInput,
    Title,
} from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import styles from "pages/physician/PhysicianOrderListPage/styles/PhysicianOrderListStyles.module.css";
import usePhysicianOrderList from "../hooks/usePhysicianOrderList";
import { WorkRow } from "./WorkRow.tsx";
import { isOrderCompleted, isOrderFresh } from "../../../../utils/checkStatus.ts";
import { ModalReportAboutDefect } from "../../../../modals/ModalReportAboutDefect/ui/ModalReportAboutDefect.tsx";

export const PhysicianOrderListPage = () => {
    const {
        orders,
        page,
        totalPages,
        works,
        currOrder,
        handleChangePage,
        getOrderInfo,
        getOrders,
        onCancelOrderClick,
    } = usePhysicianOrderList();
    const navigate = useNavigate();

    const refetch = () => {
        if (!currOrder) return;
        getOrders(page);
        getOrderInfo(currOrder);
    };

    const renderOrders = () => {
        let i = 1;
        return orders.map(order => (
            <Table.Tr key={order.id}>
                <Table.Td w={1}>{i++}</Table.Td>
                <Table.Td className={styles.noWrapDash}>
                    {order?.orderDate}
                </Table.Td>
                <Table.Td>{order.status.name}</Table.Td>
                <Table.Td w={1}>
                    <Button onClick={() => getOrderInfo(order)}>
                        <IconInfoSquare />
                    </Button>
                </Table.Td>
            </Table.Tr>
        ));
    };

    const renderWorks = () => {
        return works.map((work, index) => (
            <WorkRow
                work={work}
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
            <RoundedBoxContainer width={"100%"}>
                <Flex direction="column">
                    <Title mx={15} order={2}>
                        Заказы
                    </Title>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/create-order")}
                        m={15}
                        w="50%">
                        Оформить заказ
                    </Button>
                    {orders.length > 0 ? (
                        <Stack align="flex-start" m={20}>
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
            <RoundedBoxContainer width={"100%"}>
                <Flex direction="column" w={"100%"}>
                    <Center>
                        <Title mb={20} order={2}>
                            Информация о заказе
                        </Title>
                    </Center>
                    <Stack gap={15}>
                        {works.length > 0 && (
                            <Paper>
                                <ScrollArea scrollbars="x">
                                    <Table withTableBorder withColumnBorders>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Td>№</Table.Td>
                                                <Table.Td>Тип работы</Table.Td>
                                                <Table.Td>Статус</Table.Td>
                                                <Table.Td w="10%">
                                                    Кол-во
                                                </Table.Td>
                                                <Table.Td>Цена</Table.Td>
                                                <Table.Td>
                                                    Скидка на работу
                                                </Table.Td>
                                                <Table.Td>Рез. скидка</Table.Td>
                                                <Table.Td>Сумма</Table.Td>
                                                <Table.Td>Отметки</Table.Td>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {renderWorks()}
                                        </Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Paper>
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
                        </Flex>
                        <Flex
                            direction={{ base: "column", sm: "row" }}
                            gap={10}>
                            <TextInput
                                {...textInputStyle}
                                label="Дата оформления"
                                value={currOrder?.orderDate ?? ""}
                            />
                            <TextInput
                                {...textInputStyle}
                                label="Крайний срок выполнения"
                                value={currOrder?.deadline ?? ""}
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
                        <Textarea
                            {...textInputStyle}
                            label="Комментарий к заказу"
                            value={currOrder?.comment}
                        />
                        {(currOrder?.commentAfterAccept?.length ?? 0) > 0 && (
                            <Textarea
                                {...textInputStyle}
                                label="Комментарий к заявлению о браке"
                                value={currOrder?.commentAfterAccept}
                            />
                        )}
                        {currOrder && isOrderCompleted(currOrder?.status.number) && (
                            <ModalReportAboutDefect
                                order={currOrder}
                                works={works}
                                refetchOrder={refetch}
                            />
                        )}
                        {currOrder && isOrderFresh(currOrder.status.number) && (
                            <Button onClick={onCancelOrderClick} variant={"outline"} color={"gray"}>
                                Отменить заказ
                            </Button>
                        )}
                    </Stack>
                </Flex>
            </RoundedBoxContainer>
        </Flex>
    );
};
