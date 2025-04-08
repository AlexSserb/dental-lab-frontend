import {
    Box,
    Button, Divider,
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
import { ProductRow } from "pages/admin/AdminOrderListPage/ui/ProductRow";
import { calcDiscount, formatCost } from "utils/discounts";
import { ModalSetOrderStatus } from "../../../../modals/ModalSetOrderStatus/ui/ModalSetOrderStatus.tsx";
import createReport from "../../../../modals/ModalSetOrderStatus/utils/createReport.tsx";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

function ReadOnlyTextInput(props: TextInputProps) {
    return <TextInput {...props} readOnly w="100%" />;
}

export function AdminOrderPage() {
    const { user } = useUserContext();
    const {
        products,
        loadOrderReport,
        loadAcceptanceReport,
        loadInvoiceForPayment,
    } = useAdminOrder();
    const navigate = useNavigate();
    const { selectedOrder: order } = useOrdersContext();

    const renderProducts = () => {
        return products.map((product, index) => (
            <ProductRow
                key={product.id}
                product={product}
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
                                order: order,
                                products: products,
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
        return createReport(order, 1, "Документ \"Наряд\"", loadOrderReport);
    };

    const createAcceptanceReport = () => {
        return createReport(order, 4, "Документ \"Акт сдачи-приема\"", loadAcceptanceReport);
    };

    const createInvoiceForPayment = () => {
        return createReport(order, 1, "Документ \"Счет на оплату\"", loadInvoiceForPayment);
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
                        Изделия
                    </Title>
                    {products.length > 0 ? (
                        <ScrollArea>
                            <Table withTableBorder withColumnBorders>
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Td>№</Table.Td>
                                        <Table.Td>Тип изделия</Table.Td>
                                        <Table.Td>Статус</Table.Td>
                                        <Table.Td w="10%">Кол-во</Table.Td>
                                        <Table.Td>Цена</Table.Td>
                                        <Table.Td>Скидка на изделие</Table.Td>
                                        <Table.Td>Скидка на заказ</Table.Td>
                                        <Table.Td>Рез. скидка</Table.Td>
                                        <Table.Td>Сумма</Table.Td>
                                        <Table.Td>Подробнее</Table.Td>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{renderProducts()}</Table.Tbody>
                            </Table>
                        </ScrollArea>
                    ) : (
                        <Text>Информации об изделиях нет</Text>
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
                        />
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
