/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Customer } from './Customer';
/**
 * Сериализатор для вывода данных в профиле пользователя
 */
export type UserProfile = {
    email: string;
    firstName: string;
    lastName: string;
    readonly createdAt: string;
    customers: Array<Customer>;
    readonly group: string;
    readonly groupId: number;
};

