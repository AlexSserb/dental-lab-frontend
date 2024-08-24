import { Button, Center, Divider, Modal, Select, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { Order } from "../../../types/OrderTypes/Order.ts";
import { OrderStatusOption } from "../../../types/OrderTypes/OrderStatusOption.ts";
import orderService from "../../../services/OrderService.ts";
import OrderStatus from "../../../types/OrderTypes/OrderStatus.ts";
import { calcDiscount, formatCost } from "../../../utils/discounts.ts";
import { notifications } from "@mantine/notifications";

type ModalProps = {
    order: Order;
    setOrder: (order: Order) => void;
};

export function ModalSetOrderStatus({ order, setOrder }: ModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [orderStatuses, setOrderStatuses] = useState<OrderStatusOption[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(order.status.id);

    const loadOrderStatuses = () => {
        orderService.getOrderStatuses()
            .then(res => {
                setOrderStatuses(res.data.map((st: OrderStatus) => {
                    return { label: st.name, value: st.id };
                }));
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadOrderStatuses();
    }, []);

    const handleSubmit = () => {
        if (!selectedStatus) {
            notifications.show({
                title: "Error",
                message: "Статус заказа не выбран."
            })
            return;
        }

        orderService.setOrderStatus(order.id, selectedStatus)
            .then(res => {
                setOrder(res.data);
                handleClose();
            })
            .catch(err => console.log(err));
    }

    return (
        <Stack>
            <Button variant="contained" onClick={handleOpen}>
                Изменить статус заказа
            </Button>
            <Modal
                opened={open}
                onClose={handleClose}
                title="Изменение статуса заказа">
                <Title order={4}></Title>
                <Stack gap={10}>
                    <Text>Статус заказа</Text>
                    <Select
                        onChange={setSelectedStatus}
                        value={selectedStatus}
                        data={orderStatuses}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Сохранить
                    </Button>

                    <Divider />
                    <Center>
                        <Text variant="h6" component="h6">
                            Информация о заказе
                        </Text>
                    </Center>
                    <Divider />

                    <Text>Заказчик: {order.customer.name}</Text>
                    <Text>Врач: {order.user.lastName} {order.user.firstName}</Text>
                    <Text>Дата создания: {order.orderDate}</Text>
                    <Text>Сумма заказа: {order?.cost?.toFixed(2)} руб.</Text>
                    <Text>Скидка на заказ: {order?.discount ?? 0} %</Text>
                    <Text>Сумма заказа: {formatCost(
                        calcDiscount(order?.cost, order?.discount),
                    )} руб.</Text>
                </Stack>
            </Modal>
        </Stack>
    )
}