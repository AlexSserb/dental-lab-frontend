import { ActionIcon, Center } from "@mantine/core";
import { IconInfoHexagon } from "@tabler/icons-react";
import { useMantineReactTable } from "mantine-react-table";
import { useNavigate } from "react-router-dom";
import TableRow from "../types/TableRow";
import columns from "../utils/columns";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { OrderWithPhysician } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";
import { useMemo } from "react";

function useAdminOrderList() {
    const { selectedDate, saveSelectedDate, getOrders, orders, setSelectedOrder } = useOrdersContext();

    const navigate = useNavigate();

    const getProcessedOrders = useMemo(() => orders.map(
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
                deadline: order.deadline,
                order: order,
            };
        },
    ), [orders]);

    const table = useMantineReactTable({
        columns: columns,
        data: getProcessedOrders,
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
        localization: MRT_Localization_RU,
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
                    onClick={() => {
                        setSelectedOrder(row.original.order);
                        navigate("/order");
                    }}
                >
                    <IconInfoHexagon />
                </ActionIcon>
            </Center>
        ),
    });


    return { selectedDate, saveSelectedDate, getOrders, orders, table };
}

export default useAdminOrderList;
