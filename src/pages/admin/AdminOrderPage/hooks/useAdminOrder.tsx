import { useEffect, useState } from "react";
import documentService from "../services/DocumentService.ts";
import { saveAs } from "file-saver";
import { Work, WorksService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

function useAdminOrder() {
    const [works, setWorks] = useState<Work[]>([]);

    const { selectedOrder } = useOrdersContext();

    const loadOrderInfo = () => {
        if (!selectedOrder) return;

        WorksService.getForOrder({
            orderId: selectedOrder.id,
        })
            .then(works => {
                setWorks(works);
            })
            .catch(err => {
                setWorks([]);
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
        works,
        loadOrderReport,
        loadAcceptanceReport,
        loadInvoiceForPayment,
    };
}

export default useAdminOrder;
