import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productService from "services/ProductService";
import { Order } from "types/OrderTypes/Order";
import Product from "types/ProductTypes/Product";

function useAdminOrder() {
    const [order, setOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const { state } = useLocation();

    const getOrderInfo = (orderId: string) => {
        productService
            .getForOrder(orderId)
            .then(res => {
                setProducts(res.data);
                setOrder(state.order);
            })
            .catch(err => {
                setProducts([]);
                setOrder(null);
                console.log(err);
            });
    };

    useEffect(() => {
        getOrderInfo(state.order.id);
    }, []);

    return {
        products,
        order,
    };
}

export default useAdminOrder;
