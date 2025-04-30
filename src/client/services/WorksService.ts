/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Work } from '../models/Work';
import type { WorkAndOperations } from '../models/WorkAndOperations';
import type { WorkType } from '../models/WorkType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorksService {
    /**
     * @returns Work
     * @throws ApiError
     */
    public static getForOrder({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<Array<Work>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/works/{orderId}/',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * View is called once during the formation of the order by the administrator.
     * An operation list is generated for each item if it has not been generated previously.
     * @returns WorkAndOperations
     * @throws ApiError
     */
    public static getWithOperations({
        orderId,
    }: {
        orderId: string,
    }): CancelablePromise<Array<WorkAndOperations>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/works/operations/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }
    /**
     * @returns WorkType
     * @throws ApiError
     */
    public static getWorkTypes(): CancelablePromise<Array<WorkType>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/works/work-types/',
        });
    }
}
