import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import orderService from "services/OrderService";
import productService from "services/ProductService";
import { Order } from "types/OrderTypes/Order";
import { FullProduct } from "types/ProductTypes/Product";

function useOrderProcessing() {
    const [order, setOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<FullProduct[]>([]);
    const [curProdIdx, setCurProdIdx] = useState(0);

    const { state } = useLocation();
    const navigate = useNavigate();

    const getProductsWithOperations = () => {
        productService
            .getWithOperationsForOrder(state.order.id)
            .then(res => {
                setProducts(res.data);
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

    const handleOrderDiscountChanged = (e: any) => {
        const discount = e.target.value;
        if (order && discount >= 0 && discount < 100) {
            setOrder({ ...order, discount: e.target.value });
        }
    };

    const handleProductDiscountChanged = (e: any) => {
        const discount = e.target.value;
        if (discount >= 0 && discount < 100) {
            products[curProdIdx].discount = discount;
            setProducts([...products]);
        }
    };

    const submitOrder = () => {
        if (!order) return;

        orderService
            .confirmOrder(order, products)
            .then(res => {
                navigate("/order", { state: { order: res.data } });
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
