import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersService, WorkAndOperations, WorksService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

function useOrderProcessing() {
    const { selectedOrder: order, setSelectedOrder: setOrder } = useOrdersContext();
    const [works, setWorks] = useState<WorkAndOperations[]>([]);
    const [curWorkIdx, setCurWorkIdx] = useState(0);

    const navigate = useNavigate();

    const getWorksWithOperations = () => {
        if (!order) return;
        WorksService.getWithOperations({
            orderId: order.id,
        })
            .then(worksAndOperations => {
                setWorks(worksAndOperations);
            })
            .catch(err => {
                setWorks([]);
                console.log(err);
            });
    };

    useEffect(() => {
        getWorksWithOperations();
    }, []);

    const handleOrderDiscountChanged = (value: string | number) => {
        const discount = Number(value);
        if (order && discount >= 0 && discount < 100) {
            setOrder({ ...order, discount });
        }
    };

    const handleWorkDiscountChanged = (value: string | number) => {
        const discount = Number(value);
        if (discount >= 0 && discount < 100) {
            works[curWorkIdx].discount = discount;
            setWorks([...works]);
        }
    };

    const submitOrder = () => {
        if (!order) return;

        const worksDiscountsData = works.map(work => ({
            ...work,
            discount: work.discount ?? 0,
        }));
        const orderDiscountData = {
            ...order,
            discount: order.discount ?? 0,
        };

        OrdersService.confirmOrder({
            requestBody: {
                orderDiscountData,
                worksDiscountsData,
            },
        })
            .then(order => {
                setOrder(order);
                navigate("/order");
            })
            .catch(err => {
                console.log(err);
            });
    };

    return {
        works,
        curWorkIdx,
        setCurWorkIdx,
        submitOrder,
        handleOrderDiscountChanged,
        handleWorkDiscountChanged,
    };
}

export default useOrderProcessing;
