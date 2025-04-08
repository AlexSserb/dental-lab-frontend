/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { OrderStatus } from './OrderStatus';
export type Order = {
    readonly id: string;
    status: OrderStatus;
    readonly orderDate: string;
    discount?: number;
    readonly cost: number;
    comment?: string;
    customer: Customer;
    deadline: string;
};

