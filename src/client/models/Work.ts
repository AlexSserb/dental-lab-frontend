/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkStatus } from './WorkStatus';
import type { WorkType } from './WorkType';
export type Work = {
    readonly id: string;
    readonly workType: WorkType;
    readonly workStatus: WorkStatus;
    discount: number;
    amount: number;
    readonly cost: number;
    teeth?: Array<number>;
};

