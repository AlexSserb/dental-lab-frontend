import {
    Box,
    Button,
    Divider,
    Flex,
    ScrollArea,
    Stack,
    Table,
    Text,
    Textarea,
    TextInput,
    TextInputProps,
    Title,
} from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import { isLabAdmin } from "utils/permissions";
import useAdminOrder from "../hooks/useAdminOrder";
import { WorkRow } from "pages/admin/AdminOrderListPage/ui/WorkRow.tsx";
import { calcDiscount, formatCost } from "utils/discounts";
import { ModalSetOrderStatus } from "../../../../modals/ModalSetOrderStatus/ui/ModalSetOrderStatus.tsx";
import createReport from "../../../../modals/ModalSetOrderStatus/utils/createReport.tsx";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";
import { isOrderDefected } from "../../../../utils/checkStatus.ts";
import OrderFilesList from "../../../../components/OrderFilesList/OrderFilesList.tsx";

function ReadOnlyTextInput(props: TextInputProps) {
    return <TextInput {...props} readOnly w="100%" />;
}

export function AdminOrderPage() {
    const { user } = useUserContext();
    const {
        works,
        loadOrderReport,
        loadAcceptanceReport,
        loadInvoiceForPayment,
    } = useAdminOrder();
    const navigate = useNavigate();
    const { selectedOrder: order } = useOrdersContext();

    const renderWorks = () => {
        return works.map((work, index) => (
            <WorkRow
                key={work.id}
                work={work}
                order={order}
                index={index}
            />
        ));
    };

    const getButtonAssignOperations = () => {
        if (
            (order?.status?.number === 2 || order?.status?.number === 3) &&
            user && isLabAdmin(user)
        ) {
            return (
                <Button
                    variant="contained"
                    onClick={() => navigate("/assign-operations")}
                    w={"100%"}
                >
                    Назначить операции
                </Button>
            );
        }
    };

    const startOrderForm = () => {
        if (order && order?.status?.number === 1 && user && isLabAdmin(user)) {
            return (
                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/process-order", {
                            state: {
                                order,
                                works,
                            },
                        })
                    }
                    w={"100%"}
                >
                    Начать формирование наряда
                </Button>
            );
        }
    };

    const createOrderReport = () => {
        return createReport(order, 2, "Документ \"Наряд\"", loadOrderReport);
    };

    const createAcceptanceReport = () => {
        return createReport(order, 4, "Документ \"Акт сдачи-приема\"", loadAcceptanceReport);
    };

    const createInvoiceForPayment = () => {
        return createReport(order, 2, "Документ \"Счет на оплату\"", loadInvoiceForPayment);
    };

    return (
        <RoundedBoxContainer width="60%" minWidth="380px">
            <TitleWithBackButton
                backRef={"/"}
                title={"Информация о заказе"}
            />
            <Box>
                <Stack gap={10}>
                    <Title order={4} mt={20}>
                        Работы
                    </Title>
                    {works.length > 0 ? (
                        <ScrollArea>
                            <Table withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Td>№</Table.Td>
                                        <Table.Td>Тип работы</Table.Td>
                                        <Table.Td>Статус</Table.Td>
                                        <Table.Td w="10%">Кол-во</Table.Td>
                                        <Table.Td>Цена</Table.Td>
                                        <Table.Td>Скидка на работу</Table.Td>
                                        <Table.Td>Скидка на заказ</Table.Td>
                                        <Table.Td>Рез. скидка</Table.Td>
                                        <Table.Td>Сумма</Table.Td>
                                        <Table.Td>Подробнее</Table.Td>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{renderWorks()}</Table.Tbody>
                            </Table>
                        </ScrollArea>
                    ) : (
                        <Text>Информации о работах нет</Text>
                    )}
                    <Divider />
                    <Flex direction="row" gap="sm">
                        <ReadOnlyTextInput
                            label="Заказчик"
                            value={
                                order?.user?.lastName +
                                " " +
                                order?.user?.firstName
                            }
                        />
                        <ReadOnlyTextInput
                            label="Статус"
                            value={order?.status?.name}
                        />
                    </Flex>
                    <Flex direction="row" gap="sm">
                        <ReadOnlyTextInput
                            label="Дата"
                            value={order?.orderDate}
                        />
                        <ReadOnlyTextInput
                            label="Крайний срок выполнения"
                            value={order?.deadline}
                        />
                    </Flex>
                    <Flex direction="row" gap="sm">
                        <ReadOnlyTextInput
                            label="Сумма заказа (руб)"
                            value={order?.cost?.toFixed(2)}
                        />
                        <ReadOnlyTextInput
                            label="Скидка"
                            value={(order?.discount ?? 0) + "%"}
                        />
                        <ReadOnlyTextInput
                            label="Итоговая сумма заказа (руб)"
                            value={formatCost(
                                calcDiscount(order?.cost, order?.discount),
                            )}
                        />
                    </Flex>
                    {order?.comment && (
                        <Textarea
                            label="Комментарий к заказу"
                            value={order?.comment}
                            readOnly
                        />
                    )}
                    {isOrderDefected(order?.status.number) && (
                        <Textarea
                            label="Комментарий к выполненному заказу"
                            value={order?.commentAfterAccept}
                            readOnly
                        />
                    )}
                    {order?.files && order.files.length > 0 && (
                        <OrderFilesList files={order.files} />
                    )}
                    <Divider />
                    <Flex direction="row" gap="sm">
                        {order && <ModalSetOrderStatus />}
                        {startOrderForm()}
                        {getButtonAssignOperations()}
                    </Flex>
                    <Flex direction="row" gap="sm">
                        {createOrderReport()}
                        {createAcceptanceReport()}
                        {createInvoiceForPayment()}
                    </Flex>
                </Stack>
            </Box>
        </RoundedBoxContainer>
    );
}
