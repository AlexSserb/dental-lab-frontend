/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * What the workflow proposes: the classification, the operation to redo, cause and recommendation.
 */
export type Proposal = {
    readonly description: string;
    /**
     * * `fit` - fit
     * * `color` - color
     * * `porosity` - porosity
     * * `crack_chipping` - crack_chipping
     * * `other` - other
     */
    readonly defectType: 'fit' | 'color' | 'porosity' | 'crack_chipping' | 'other';
    /**
     * * `low` - low
     * * `medium` - medium
     * * `high` - high
     */
    readonly severity: 'low' | 'medium' | 'high';
    readonly operationId: string;
    readonly operationName: string;
    readonly likelyCause: string;
    readonly recommendation: string;
};

