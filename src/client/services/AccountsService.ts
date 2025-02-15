/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachCustomersToUser } from '../models/AttachCustomersToUser';
import type { Customer } from '../models/Customer';
import type { CustomTokenObtainPair } from '../models/CustomTokenObtainPair';
import type { CustomTokenRefresh } from '../models/CustomTokenRefresh';
import type { Message } from '../models/Message';
import type { PasswordChange } from '../models/PasswordChange';
import type { TokenPair } from '../models/TokenPair';
import type { User } from '../models/User';
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AccountsService {
    /**
     * @returns Customer
     * @throws ApiError
     */
    public static getCustomers(): CancelablePromise<Array<Customer>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts/customers/',
        });
    }
    /**
     * @returns UserProfile
     * @throws ApiError
     */
    public static attachCustomersToUser({
        requestBody,
    }: {
        requestBody: AttachCustomersToUser,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/customers/attach',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static changePassword({
        requestBody,
    }: {
        requestBody: PasswordChange,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/password-change/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns UserProfile
     * @throws ApiError
     */
    public static getProfileData({
        email,
    }: {
        email: string,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts/profile/{email}',
            path: {
                'email': email,
            },
        });
    }
    /**
     * @returns UserProfile
     * @throws ApiError
     */
    public static editFirstName({
        email,
        name,
    }: {
        email: string,
        name: string,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/accounts/profile/edit-first-name/{email}/{name}',
            path: {
                'email': email,
                'name': name,
            },
        });
    }
    /**
     * @returns UserProfile
     * @throws ApiError
     */
    public static editLastName({
        email,
        name,
    }: {
        email: string,
        name: string,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/accounts/profile/edit-last-name/{email}/{name}',
            path: {
                'email': email,
                'name': name,
            },
        });
    }
    /**
     * @returns TokenPair
     * @throws ApiError
     */
    public static register({
        requestBody,
    }: {
        requestBody: User,
    }): CancelablePromise<TokenPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/register/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Message
     * @throws ApiError
     */
    public static sendEmailVerification(): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/send-email-verification/',
        });
    }
    /**
     * @returns UserProfile
     * @throws ApiError
     */
    public static getTechniciansByGroup({
        groupId,
    }: {
        groupId: number,
    }): CancelablePromise<Array<UserProfile>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts/technicians/{groupId}',
            path: {
                'groupId': groupId,
            },
        });
    }
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @returns CustomTokenObtainPair
     * @throws ApiError
     */
    public static accountsTokenCreate({
        requestBody,
    }: {
        requestBody: CustomTokenObtainPair,
    }): CancelablePromise<CustomTokenObtainPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @returns CustomTokenRefresh
     * @throws ApiError
     */
    public static accountsTokenRefreshCreate({
        requestBody,
    }: {
        requestBody: CustomTokenRefresh,
    }): CancelablePromise<CustomTokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/accounts/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static verifyEmail(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/accounts/verify-email/',
        });
    }
}
