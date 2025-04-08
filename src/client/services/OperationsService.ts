/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FullOperation } from '../models/FullOperation';
import type { Operation } from '../models/Operation';
import type { OperationForSchedule } from '../models/OperationForSchedule';
import type { OperationForTechSchedule } from '../models/OperationForTechSchedule';
import type { OperationsPaginatedList } from '../models/OperationsPaginatedList';
import type { OperationStatus } from '../models/OperationStatus';
import type { PatchedAssignOperation } from '../models/PatchedAssignOperation';
import type { PatchedSetOperationData } from '../models/PatchedSetOperationData';
import type { PatchedUpdateOperationStatus } from '../models/PatchedUpdateOperationStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OperationsService {
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static assignOperation({
        requestBody,
    }: {
        requestBody?: PatchedAssignOperation,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/operations/assign-operation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns OperationStatus
     * @throws ApiError
     */
    public static getOperationStatuses(): CancelablePromise<Array<OperationStatus>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations/operation-statuses/',
        });
    }
    /**
     * @returns Operation
     * @throws ApiError
     */
    public static updateOperationStatus({
        operationId,
        requestBody,
    }: {
        operationId: string,
        requestBody?: PatchedUpdateOperationStatus,
    }): CancelablePromise<Operation> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/operations/operation/{operationId}',
            path: {
                'operationId': operationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns FullOperation
     * @throws ApiError
     */
    public static getForProduct({
        productId,
    }: {
        productId: string,
    }): CancelablePromise<Array<FullOperation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations/operations-for-product/{productId}/',
            path: {
                'productId': productId,
            },
        });
    }
    /**
     * @returns OperationForSchedule
     * @throws ApiError
     */
    public static getForSchedule({
        dateStart,
    }: {
        dateStart: string,
    }): CancelablePromise<Array<OperationForSchedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations/operations-for-schedule/{dateStart}',
            path: {
                'dateStart': dateStart,
            },
        });
    }
    /**
     * @returns OperationForTechSchedule
     * @throws ApiError
     */
    public static getForTechSchedule({
        dateStart,
        techEmail,
    }: {
        dateStart: string,
        techEmail: string,
    }): CancelablePromise<Array<OperationForTechSchedule>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations/operations-for-schedule/{dateStart}/{techEmail}',
            path: {
                'dateStart': dateStart,
                'techEmail': techEmail,
            },
        });
    }
    /**
     * @returns OperationsPaginatedList
     * @throws ApiError
     */
    public static getForTech({
        page,
    }: {
        page?: number,
    }): CancelablePromise<OperationsPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/operations/operations-for-tech/',
            query: {
                'page': page,
            },
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static updateOperation({
        requestBody,
    }: {
        requestBody?: PatchedSetOperationData,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/operations/update-operation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
