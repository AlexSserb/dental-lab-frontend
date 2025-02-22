import { ActionIcon, Center } from "@mantine/core";
import { IconInfoHexagon } from "@tabler/icons-react";
import { AxiosError } from "axios";
import { useMantineReactTable } from "mantine-react-table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableRow from "../types/TableRow";
import columns from "../utils/columns";
import { OrdersService, OrderWithPhysician } from "../../../../client";

function useAdminOrderList() {
    const [orders, setOrders] = useState<TableRow[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const navigator = useNavigate();

    const table = useMantineReactTable({
        columns: columns,
        data: orders,
        enableFullScreenToggle: false,
        enableGrouping: true,
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        mantinePaginationProps: {
            radius: "xl",
            size: "lg",
        },
        mantineSearchTextInputProps: {
            placeholder: "Поиск",
        },
        enableRowActions: true,
        positionActionsColumn: "last",
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Подробнее",
                size: 30,
            },
        },
        renderRowActions: ({ row }) => (
            <Center>
                <ActionIcon
                    onClick={() =>
                        navigator("/order", {
                            state: { order: row.original.order },
                        })
                    }>
                    <IconInfoHexagon />
                </ActionIcon>
            </Center>
        ),
    });

    const saveSelectedDate = (date: Date | null) => {
        if (!date) return;
        setSelectedDate(date);
        localStorage.setItem("orderListDate", date!.toISOString());
    };

    const getInitialDateFromLocalStorage = () => {
        const dateFromStorage: string | null =
            localStorage.getItem("orderListDate");

        if (dateFromStorage) {
            setSelectedDate(new Date(dateFromStorage));
            return;
        }

        setSelectedDate(new Date());
    };

    useEffect(() => {
        getInitialDateFromLocalStorage();
        getOrders();
    }, []);

    const getOrders = () => {
        const dateFromStorage: string | null =
            localStorage.getItem("orderListDate");

        console.log(dateFromStorage);
        if (!dateFromStorage) return;

        const date = new Date(dateFromStorage);

        OrdersService.getOrder({
            month: date.getMonth() + 1,
            year: date.getFullYear(),
        })
            .then(orders => {
                const result: TableRow[] = orders.map(
                    (order: OrderWithPhysician): TableRow => {
                        return {
                            customer: order.customer.name,
                            user:
                                order.user.lastName +
                                " " +
                                order.user.firstName,
                            status: order.status.name,
                            cost: order.cost,
                            date: order.orderDate,
                            order: order,
                        };
                    }
                );
                setOrders(result);
            })
            .catch((err: AxiosError) => {
                console.log(err);
            });
    };

    return { selectedDate, saveSelectedDate, getOrders, orders, table };
}

export default useAdminOrderList;
