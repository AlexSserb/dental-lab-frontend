/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperationStatus } from './OperationStatus';
import type { OperationType } from './OperationType';
import type { Product } from './Product';
export type OperationForSchedule = {
    id: string;
    start: string;
    end: string;
    operationType: OperationType;
    operationStatus: OperationStatus;
    product: Product;
};

