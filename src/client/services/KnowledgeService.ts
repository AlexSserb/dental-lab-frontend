/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { KnowledgeAskRequest } from '../models/KnowledgeAskRequest';
import type { KnowledgeAskResponse } from '../models/KnowledgeAskResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class KnowledgeService {
    /**
     * @returns KnowledgeAskResponse
     * @throws ApiError
     */
    public static askKnowledgeBase({
        requestBody,
    }: {
        requestBody: KnowledgeAskRequest,
    }): CancelablePromise<KnowledgeAskResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/knowledge/ask/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
