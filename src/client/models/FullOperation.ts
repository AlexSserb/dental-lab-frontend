/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperationEvent } from './OperationEvent';
import type { OperationStatus } from './OperationStatus';
import type { OperationType } from './OperationType';
import type { UserProfile } from './UserProfile';
export type FullOperation = {
    readonly id: string;
    operationType: OperationType;
    operationStatus: OperationStatus;
    tech: UserProfile;
    execStart?: string | null;
    ordinalNumber: number;
    history: Array<OperationEvent>;
    isExecStartEditable?: boolean;
    readonly execTime: string;
};

