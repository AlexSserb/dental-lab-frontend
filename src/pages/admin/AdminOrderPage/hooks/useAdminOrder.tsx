import { useEffect, useState } from "react";
import documentService from "../services/DocumentService.ts";
import { saveAs } from "file-saver";
import { Product, ProductsService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

function useAdminOrder() {
    const [products, setProducts] = useState<Product[]>([]);

    const { selectedOrder } = useOrdersContext();

    const loadOrderInfo = () => {
        if (!selectedOrder) return;

        ProductsService.getForOrder({
            orderId: selectedOrder.id,
        })
            .then(products => {
                setProducts(products);
            })
            .catch(err => {
                setProducts([]);
                console.log(err);
            });
    };

    useEffect(() => {
        loadOrderInfo();
    }, [selectedOrder]);

    const loadOrderReport = () => {
        if (!selectedOrder) return;
        documentService.getOrderReport(selectedOrder.id)
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
        if (!selectedOrder) return;
        documentService.getAcceptanceReport(selectedOrder.id)
            .then(res => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });
                saveAs(pdfBlob, "Акт сдачи-приема.pdf");
            })
            .catch(err => {
                console.log(err);
            });
    };

    const loadInvoiceForPayment = () => {
        if (!selectedOrder) return;
        documentService.getInvoiceForPayment(selectedOrder.id)
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
        loadOrderReport,
        loadAcceptanceReport,
        loadInvoiceForPayment,
    };
}

export default useAdminOrder;
