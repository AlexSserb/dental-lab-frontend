import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { OrdersService, OrderWithPhysician } from "../../client";
import { AxiosError } from "axios";

type OrderContextState = {
    orders: OrderWithPhysician[];
    selectedOrder: OrderWithPhysician | null;
    setSelectedOrder: React.Dispatch<React.SetStateAction<OrderWithPhysician | null>>;
    getOrders: () => void;
    selectedDate: Date;
    saveSelectedDate: (date: Date | null) => void;
};

const OrdersContext = createContext<OrderContextState | undefined>(undefined);

const useOrdersContextState = () => {
    const [orders, setOrders] = useState<OrderWithPhysician[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<OrderWithPhysician | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
            .then(response => {
                setOrders(response);
            })
            .catch((err: AxiosError) => {
                console.log(err);
            });
    };

    return {
        selectedDate,
        saveSelectedDate,
        getOrders,
        orders,
        selectedOrder,
        setSelectedOrder,
    };
};

type OrdersContextProviderProps = {
    children: React.ReactNode;
};

export const OrdersContextProvider: FC<OrdersContextProviderProps> = ({ children }) => {
    const state = useOrdersContextState();

    return (
        <OrdersContext.Provider value={state}>
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrdersContext = () => {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error(
            "useOrdersContext must be used within a OrdersContextProvider",
        );
    }
    return context;
};
