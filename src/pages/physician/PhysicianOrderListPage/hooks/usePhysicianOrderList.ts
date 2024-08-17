import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getOrdersForUser,
    getProductsForOrder,
} from "../api/physicianOrderListApi";
import { AxiosResponse } from "axios";
import { OrderPage } from "../types/OrderPage";
import Product from "types/ProductTypes/Product";
import { OrderBrief } from "types/OrderTypes/Order";

function usePhysicianOrderList() {
    const [orders, setOrders] = useState<OrderBrief[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [currOrder, setCurrOrder] = useState<OrderBrief | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getOrders(page);
    }, []);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        getOrders(newPage);
    };

    const getOrders = (orderPage: number) => {
        getOrdersForUser(orderPage)
            .then((res: AxiosResponse<OrderPage>) => {
                setOrders(res.data.results);
                setTotalPages(res.data.totalPages);
                if (res.data.results.length > 0) {
                    setCurrOrder(res.data.results[0]);
                    getOrderInfo(res.data.results[0]);
                } else {
                    navigate("/create-order");
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getOrderInfo = (order: OrderBrief) => {
        getProductsForOrder(order.id)
            .then(res => {
                setProducts(res.data);
                setCurrOrder(order);
            })
            .catch(err => {
                setProducts([]);
                setCurrOrder(null);
                console.log(err);
            });
    };

    return {
        orders,
        page,
        totalPages,
        products,
        currOrder,
        handleChangePage,
        getOrderInfo,
    };
}

export default usePhysicianOrderList;
