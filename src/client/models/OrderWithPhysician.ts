/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
import type { OrderStatus } from './OrderStatus';
import type { UserProfile } from './UserProfile';
export type OrderWithPhysician = {
    readonly id: string;
    readonly status: OrderStatus;
    readonly orderDate: string;
    discount?: number;
    readonly cost: number;
    user: UserProfile;
    comment?: string;
    customer: Customer;
    deadline: string;
    commentAfterAccept?: string;
};

