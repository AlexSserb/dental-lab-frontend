import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrdersService, OrderWithPhysician, ProductAndOperations, ProductsService } from "../../../../client";

function useOrderProcessing() {
    const [order, setOrder] = useState<OrderWithPhysician | null>(null);
    const [products, setProducts] = useState<ProductAndOperations[]>([]);
    const [curProdIdx, setCurProdIdx] = useState(0);

    const { state } = useLocation();
    const navigate = useNavigate();

    const getProductsWithOperations = () => {
        ProductsService.getWithOperations({
            orderId: state.order.id,
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
        setOrder(state.order);

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
                navigate("/order", { state: { order } });
            })
            .catch(err => {
                console.log(err);
            });
    };

    return {
        order,
        products,
        curProdIdx,
        setCurProdIdx,
        submitOrder,
        handleOrderDiscountChanged,
        handleProductDiscountChanged,
    };
}

export default useOrderProcessing;
