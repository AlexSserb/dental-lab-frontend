import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productService from "services/ProductService";
import { Order } from "types/OrderTypes/Order";
import Product from "types/ProductTypes/Product";
import documentService from "../../../../services/DocumentService.ts";
import { saveAs } from "file-saver";

function useAdminOrder() {
    const [order, setOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const { state } = useLocation();

    const loadOrderInfo = (orderId: string) => {
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
        loadOrderInfo(state.order.id);
    }, []);

    const loadOrderReport = () => {
        if (!order) return;
        documentService.getOrderReport(order.id)
            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, "Наряд.pdf");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const loadAcceptanceReport = () => {
        if (!order) return;
        documentService.getAcceptanceReport(order.id)
            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, "Акт сдачи-приема.pdf");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const loadInvoiceForPayment = () => {
        if (!order) return;
        documentService.getInvoiceForPayment(order.id)
            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, "Счет на оплату.pdf");
            })
            .catch(err => {
                console.log(err);
            });
    };

    return {
        products,
        order,
        setOrder,
        loadOrderReport,
        loadAcceptanceReport,
        loadInvoiceForPayment,
    };
}

export default useAdminOrder;
