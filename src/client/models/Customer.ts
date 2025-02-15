/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Сериализатор для заказчика (клиники, больницы)
 */
export type Customer = {
    readonly id: string;
    name: string;
    phoneNumber: string;
    taxPayerId: string;
    reasonCodeForReg: string;
    checkingAccount: string;
    adrsCity: string;
    adrsStreet: string;
    adrsHouse: number;
    mailIndex: string;
    readonly createdAt: string;
    isActive?: boolean;
};

