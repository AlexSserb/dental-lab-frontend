/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperationForProduct } from './OperationForProduct';
import type { ProductStatus } from './ProductStatus';
import type { ProductType } from './ProductType';
export type ProductAndOperations = {
    readonly id: string;
    readonly productType: ProductType;
    readonly productStatus: ProductStatus;
    discount: number;
    amount: number;
    readonly cost: number;
    teeth?: Array<number>;
    operations: Array<OperationForProduct>;
};

