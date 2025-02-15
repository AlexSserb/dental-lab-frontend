/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Сериализатор для регистрации пользователя
 */
export type User = {
    id?: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isVerified?: boolean;
    isActive?: boolean;
    customers: Array<string>;
};

