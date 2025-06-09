/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OperationStatus } from './OperationStatus';
import type { OperationType } from './OperationType';
import type { OrderFile } from './OrderFile';
import type { Work } from './Work';
export type Operation = {
    readonly id: string;
    operationType: OperationType;
    operationStatus: OperationStatus;
    work: Work;
    execStart?: string | null;
    ordinalNumber: number;
    isExecStartEditable?: boolean;
    readonly execTime: string;
    readonly files: Array<OrderFile>;
    readonly color: string;
};

