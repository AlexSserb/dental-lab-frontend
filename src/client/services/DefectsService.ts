/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TriageDecision } from '../models/TriageDecision';
import type { TriageDetail } from '../models/TriageDetail';
import type { TriageListItem } from '../models/TriageListItem';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefectsService {
    /**
     * Pending defect triages (submitted, processing, awaiting review, decided)
     * @returns TriageListItem
     * @throws ApiError
     */
    public static listDefectTriages(): CancelablePromise<Array<TriageListItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/defects/triage/',
        });
    }
    /**
     * One triage: the proposal, the works and similar closed cases
     * @returns TriageDetail
     * @throws ApiError
     */
    public static getDefectTriage({
        triageId,
    }: {
        triageId: string,
    }): CancelablePromise<TriageDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/defects/triage/{triageId}/',
            path: {
                'triageId': triageId,
            },
            errors: {
                404: `Unknown triage`,
            },
        });
    }
    /**
     * Approve, edit, reject or dismiss a triage (the worker picks it up)
     * @returns any Decision stored; the worker resumes the graph
     * @throws ApiError
     */
    public static decideDefectTriage({
        triageId,
        requestBody,
    }: {
        triageId: string,
        requestBody: TriageDecision,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/defects/triage/{triageId}/decision',
            path: {
                'triageId': triageId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid decision payload`,
                404: `Unknown triage`,
                409: `The triage is not awaiting a review (already decided, closed, failed)`,
            },
        });
    }
}
