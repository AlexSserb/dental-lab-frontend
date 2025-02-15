import axios, { AxiosResponse } from "axios";

const API_URL = "orders/";

class DocumentService {
    getOrderReport(orderId: string): Promise<AxiosResponse<Blob>> {
        return axios.get(API_URL + `order-report/${orderId}`, {
            responseType: "blob",
        });
    }

    getAcceptanceReport(orderId: string): Promise<AxiosResponse<Blob>> {
        return axios.get(API_URL + `acceptance-report/${orderId}`, {
            responseType: "blob",
        });
    }

    getInvoiceForPayment(orderId: string): Promise<AxiosResponse<Blob>> {
        return axios.get(API_URL + `invoice-for-payment/${orderId}`, {
            responseType: "blob",
        });
    }
}

const documentService = new DocumentService();
export default documentService;
