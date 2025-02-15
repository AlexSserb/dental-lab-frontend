import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Order, OrdersService, Product, ProductsService } from "../../../../client";

function usePhysicianOrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
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
                setOrders(res.results);
                setTotalPages(res.totalPages);
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
        ProductsService.getForOrder({
            orderId: order.id,
        })
            .then(products => {
                setProducts(products);
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
