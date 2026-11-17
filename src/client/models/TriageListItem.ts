/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * One row of the pending list.
 */
export type TriageListItem = {
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
    readonly revisions: number;
    /**
     * * `approve` - Утвердить
     * * `edit` - Утвердить с правками
     * * `reject` - Предложить заново
     * * `dismiss` - Закрыть без изменений
     */
    readonly decision: 'approve' | 'edit' | 'reject' | 'dismiss';
    readonly createdAt: string;
};

