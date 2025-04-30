/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelOrder } from '../models/CancelOrder';
import type { DataForOrderCreation } from '../models/DataForOrderCreation';
import type { OrderDiscountSetter } from '../models/OrderDiscountSetter';
import type { OrdersPaginatedList } from '../models/OrdersPaginatedList';
import type { OrderStatus } from '../models/OrderStatus';
import type { OrderWithPhysician } from '../models/OrderWithPhysician';
import type { PatchedUpdateOrderStatus } from '../models/PatchedUpdateOrderStatus';
import type { ReportDefect } from '../models/ReportDefect';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static ordersAcceptanceReportRetrieve({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/acceptance-report/{orderId}/',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static cancelOrder({
        requestBody,
    }: {
        requestBody: CancelOrder,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/cancel-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns OrderWithPhysician
     * @throws ApiError
     */
    public static confirmOrder({
        requestBody,
    }: {
        requestBody: OrderDiscountSetter,
    }): CancelablePromise<OrderWithPhysician> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/confirm-order/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static createOrder({
        requestBody,
    }: {
        requestBody: DataForOrderCreation,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/create-order/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static ordersInvoiceForPaymentRetrieve({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/invoice-for-payment/{orderId}/',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static ordersOrderReportRetrieve({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/order-report/{orderId}/',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns OrderStatus
     * @throws ApiError
     */
    public static getOrderStatuses(): CancelablePromise<Array<OrderStatus>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/order-statuses/',
        });
    }
    /**
     * @returns OrdersPaginatedList
     * @throws ApiError
     */
    public static getOrdersForPhysician({
        page,
    }: {
        page?: number,
    }): CancelablePromise<OrdersPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/orders-for-physician/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @returns OrderWithPhysician
     * @throws ApiError
     */
    public static getOrder({
        month,
        year,
    }: {
        month: number,
        year: number,
    }): CancelablePromise<Array<OrderWithPhysician>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/orders/{year}/{month}/',
            path: {
                'month': month,
                'year': year,
            },
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static reportDefect({
        requestBody,
    }: {
        requestBody: ReportDefect,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders/report-defect',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns OrderWithPhysician
     * @throws ApiError
     */
    public static setOrderStatus({
        orderId,
        requestBody,
    }: {
        orderId: string,
        requestBody?: PatchedUpdateOrderStatus,
    }): CancelablePromise<OrderWithPhysician> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/orders/set-order-status/{orderId}',
            path: {
                'orderId': orderId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
