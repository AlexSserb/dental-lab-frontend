import { Button, Center, Divider, Modal, Select, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { calcDiscount, formatCost } from "../../../utils/discounts.ts";
import { notifications } from "@mantine/notifications";
import { OrdersService, OrderStatus, OrderWithPhysician } from "../../../client";
import { Option } from "../../../types/Option.ts";

type ModalProps = {
    order: OrderWithPhysician;
    setOrder: (order: OrderWithPhysician) => void;
};

export function ModalSetOrderStatus({ order, setOrder }: ModalProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [orderStatuses, setOrderStatuses] = useState<Option[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(order.status.id);

    const loadOrderStatuses = () => {
        OrdersService.getOrderStatuses()
            .then(statuses => {
                setOrderStatuses(statuses.map((st: OrderStatus) => {
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
        OrdersService.setOrderStatus({
            requestBody: {
                status: selectedStatus,
            },
            orderId: order.id,
        })
            .then(order => {
                setOrder(order);
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