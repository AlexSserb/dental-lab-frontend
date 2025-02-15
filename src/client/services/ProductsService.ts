/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Product } from '../models/Product';
import type { ProductAndOperations } from '../models/ProductAndOperations';
import type { ProductType } from '../models/ProductType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * @returns Product
     * @throws ApiError
     */
    public static getForOrder({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/{orderId}/',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * View is called once during the formation of the order by the administrator.
     * An operation list is generated for each item if it has not been generated previously.
     * @returns ProductAndOperations
     * @throws ApiError
     */
    public static getWithOperations({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<Array<ProductAndOperations>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/operations/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns ProductType
     * @throws ApiError
     */
    public static getProductTypes(): CancelablePromise<Array<ProductType>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/products/product-types/',
        });
    }
}
