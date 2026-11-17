/**
 * Shared labels and badges of the defect-triage workflow. The values mirror the backend enums
 * (defects/models.py); the display names are the Russian verbose names of the same choices.
 */
import { Badge } from "@mantine/core";

export type DefectTriageState =
    | "submitted"
    | "processing"
    | "awaiting_review"
    | "decided"
    | "applied"
    | "rejected"
    | "failed";

export type DefectDecisionAction = "approve" | "edit" | "reject" | "dismiss";

export const TRIAGE_STATE_LABELS: Record<DefectTriageState, string> = {
    submitted: "Ожидает обработки",
    processing: "Обрабатывается",
    awaiting_review: "Ожидает решения",
    decided: "Решение принято",
    applied: "Применено",
    rejected: "Отклонено",
    failed: "Ошибка обработки",
};

const TRIAGE_STATE_COLORS: Record<DefectTriageState, string> = {
    submitted: "gray",
    processing: "blue",
    awaiting_review: "orange",
    decided: "indigo",
    applied: "green",
    rejected: "gray",
    failed: "red",
};

/** States where the system (worker) is still working on the triage — the review page polls in them. */
export const POLLING_STATES: DefectTriageState[] = ["submitted", "processing", "decided"];

export const DEFECT_TYPE_LABELS: Record<string, string> = {
    fit: "Посадка / краевое прилегание",
    color: "Несоответствие цвета",
    porosity: "Пористость / пузыри",
    crack_chipping: "Трещины / сколы",
    other: "Другое",
};

export const DEFECT_SEVERITY_LABELS: Record<string, string> = {
    low: "Незначительный",
    medium: "Значительный",
    high: "Критический",
};

const DEFECT_SEVERITY_COLORS: Record<string, string> = {
    low: "green",
    medium: "yellow",
    high: "red",
};

export const DECISION_LABELS: Record<DefectDecisionAction, string> = {
    approve: "Утверждено",
    edit: "Утверждено с правками",
    reject: "Отправлено на повторное предложение",
    dismiss: "Закрыто без изменений",
};

export function TriageStateBadge({ state, polling = false }: { state: DefectTriageState; polling?: boolean }) {
    return (
        <Badge color={TRIAGE_STATE_COLORS[state]} variant="light" leftSection={polling ? "…" : undefined}>
            {TRIAGE_STATE_LABELS[state]}
        </Badge>
    );
}

export function DefectTypeBadge({ defectType }: { defectType: string }) {
    return <Badge variant="outline">{DEFECT_TYPE_LABELS[defectType] ?? defectType}</Badge>;
}

export function DefectSeverityBadge({ severity }: { severity: string }) {
    return (
        <Badge color={DEFECT_SEVERITY_COLORS[severity] ?? "gray"} variant="light">
            {DEFECT_SEVERITY_LABELS[severity] ?? severity}
        </Badge>
    );
}
