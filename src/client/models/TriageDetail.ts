/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Proposal } from './Proposal';
import type { SimilarCase } from './SimilarCase';
import type { TriageWork } from './TriageWork';
export type TriageDetail = {
    readonly id: string;
    readonly orderId: string;
    /**
     * * `submitted` - Ожидает обработки
     * * `processing` - Обрабатывается
     * * `awaiting_review` - Ожидает решения администратора
     * * `decided` - Решение принято, ожидает применения
     * * `applied` - Применено
     * * `rejected` - Отклонено
     * * `failed` - Ошибка обработки
     */
    readonly state: 'submitted' | 'processing' | 'awaiting_review' | 'decided' | 'applied' | 'rejected' | 'failed';
    readonly comment: string;
    readonly works: Array<TriageWork>;
    readonly proposal: Proposal | null;
    readonly similarCases: Array<SimilarCase>;
    readonly revisions: number;
    readonly error: string;
    /**
     * * `approve` - Утвердить
     * * `edit` - Утвердить с правками
     * * `reject` - Предложить заново
     * * `dismiss` - Закрыть без изменений
     */
    readonly decision: 'approve' | 'edit' | 'reject' | 'dismiss';
    readonly decisionNote: string;
    readonly final: any;
    readonly createdAt: string;
    readonly decidedAt: string | null;
    readonly appliedAt: string | null;
    readonly notifiedAt: string | null;
    readonly notifyError: string;
};

