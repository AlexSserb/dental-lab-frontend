import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Order, OrdersService, Work, WorksService } from "../../../../client";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { Text } from "@mantine/core";

function usePhysicianOrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [works, setWorks] = useState<Work[]>([]);
    const [currOrder, setCurrOrder] = useState<Order | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders(page);
    }, []);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        getOrders(newPage);
    };

    const getOrders = (orderPage: number) => {
        OrdersService.getOrdersForPhysician({
            page: orderPage,
        })
            .then((res) => {
                console.log(res.results);
                setOrders(res.results);
                setTotalPages(res.totalPages);
                if (currOrder) return;
                if (res.results.length > 0) {
                    setCurrOrder(res.results[0]);
                    getOrderInfo(res.results[0]);
                } else {
                    navigate("/create-order");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getOrderInfo = (order: Order) => {
        WorksService.getForOrder({
            orderId: order.id,
        })
            .then(works => {
                setWorks(works);
                setCurrOrder(order);
            })
            .catch(err => {
                setWorks([]);
                setCurrOrder(null);
                console.log(err);
            });
    };

    const cancelOrder = () => {
        if (!currOrder) return;
        OrdersService.cancelOrder({
            requestBody: {
                order: currOrder?.id,
            },
        })
            .then(() => {
                setCurrOrder(null);
                getOrders(page);
                notifications.show({
                    message: "Заказ успешно отменен",
                });
            })
            .catch(err => console.log(err));
    };

    const onCancelOrderClick = () => {
        modals.openConfirmModal({
            title: "Удаление должности",
            children: (
                <Text size="sm">
                    Вы уверены, что хотите отменить заказ?
                </Text>
            ),
            labels: { confirm: "Да", cancel: "Нет" },
            confirmProps: { color: "red" },
            onConfirm: () => cancelOrder(),
        });
    };

    return {
        orders,
        page,
        totalPages,
        works,
        currOrder,
        handleChangePage,
        getOrders,
        getOrderInfo,
        onCancelOrderClick,
    };
}

export default usePhysicianOrderList;
