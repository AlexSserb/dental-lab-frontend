/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * The administrator's answer on the review gate. approve accepts the proposal as is, edit sends corrected
 * values in `final`, reject must say in `note` what was wrong, dismiss closes the triage without changes.
 */
export type TriageDecision = {
    /**
     * * `approve` - approve
     * * `edit` - edit
     * * `reject` - reject
     * * `dismiss` - dismiss
     */
    action: 'approve' | 'edit' | 'reject' | 'dismiss';
    note?: string;
    final?: any;
};

