/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SimilarCase = {
    readonly id: string;
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
    readonly description: string;
    readonly cause: string;
    readonly resolution: string;
    readonly distance: number;
};

