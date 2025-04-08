import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersService, ProductAndOperations, ProductsService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

function useOrderProcessing() {
    const { selectedOrder: order, setSelectedOrder: setOrder } = useOrdersContext();
    const [products, setProducts] = useState<ProductAndOperations[]>([]);
    const [curProdIdx, setCurProdIdx] = useState(0);

    const navigate = useNavigate();

    const getProductsWithOperations = () => {
        if (!order) return;
        ProductsService.getWithOperations({
            orderId: order.id,
        })
            .then(productsAndOperations => {
                setProducts(productsAndOperations);
            })
            .catch(err => {
                setProducts([]);
                console.log(err);
            });
    };

    useEffect(() => {
        getProductsWithOperations();
    }, []);

    const handleOrderDiscountChanged = (value: string | number) => {
        const discount = Number(value);
        if (order && discount >= 0 && discount < 100) {
            setOrder({ ...order, discount });
        }
    };

    const handleProductDiscountChanged = (value: string | number) => {
        const discount = Number(value);
        if (discount >= 0 && discount < 100) {
            products[curProdIdx].discount = discount;
            setProducts([...products]);
        }
    };

    const submitOrder = () => {
        if (!order) return;

        const productsDiscountsData = products.map(product => ({
            ...product,
            discount: product.discount ?? 0,
        }));
        const orderDiscountData = {
            ...order,
            discount: order.discount ?? 0,
        };

        OrdersService.confirmOrder({
            requestBody: {
                orderDiscountData,
                productsDiscountsData,
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
        products,
        curProdIdx,
        setCurProdIdx,
        submitOrder,
        handleOrderDiscountChanged,
        handleProductDiscountChanged,
    };
}

export default useOrderProcessing;
