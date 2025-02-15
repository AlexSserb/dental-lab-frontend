import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import documentService from "../services/DocumentService.ts";
import { saveAs } from "file-saver";
import { OrderWithPhysician, Product, ProductsService } from "../../../../client";

function useAdminOrder() {
    const [order, setOrder] = useState<OrderWithPhysician | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const { state } = useLocation();

    const loadOrderInfo = (orderId: string) => {
        ProductsService.getForOrder({
            orderId,
        })
            .then(products => {
                setProducts(products);
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
                console.log(res.data);
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
