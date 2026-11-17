import { useEffect, useMemo, useState } from "react";
import {
    Button,
    Group,
    Loader,
    Modal,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    DefectsService,
    FullOperation,
    OperationsService,
    TriageDetail,
} from "../../../../client";
import { showErrorNotification } from "utils/notifications";
import { DEFECT_SEVERITY_LABELS, DEFECT_TYPE_LABELS } from "utils/defectTriage";
import { ApiError } from "../../../../client/core/ApiError";

type Props = {
    triage: TriageDetail;
    onDecided: () => void;
};

type Action = "approve" | "edit" | "reject" | "dismiss";

const ACTION_TITLES: Record<Action, string> = {
    approve: "Утвердить как есть",
    edit: "Утвердить с правками",
    reject: "Предложить заново",
    dismiss: "Закрыть без изменений",
};

const ACTION_COLORS: Record<Action, string> = {
    approve: "green",
    edit: "blue",
    reject: "yellow",
    dismiss: "red",
};

const DECISION_MESSAGES: Record<Action, string> = {
    approve: "Предложение утверждено — система применит его автоматически.",
    edit: "Правки сохранены — система применит их автоматически.",
    reject: "Система готовит новое предложение.",
    dismiss: "Разбор закрыт без изменений.",
};

/** The decision block of the review page. Rendered only while the triage is awaiting a review. */
export function DecisionPanel({ triage, onDecided }: Props) {
    const [action, setAction] = useState<Action | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [note, setNote] = useState("");
    const [noteError, setNoteError] = useState("");
    const [operations, setOperations] = useState<FullOperation[]>([]);
    const [operationsLoading, setOperationsLoading] = useState(false);
    const proposal = triage.proposal;

    // Edit form state: prefilled from the proposal, so "approve with edits" is a small correction, not
    // a retyping of everything the model already got right.
    const [final, setFinal] = useState<{
        operationId: string;
        defectType: string;
        severity: string;
        likelyCause: string;
        recommendation: string;
        description: string;
    }>({
        operationId: proposal?.operationId ?? "",
        defectType: proposal?.defectType ?? "other",
        severity: proposal?.severity ?? "medium",
        likelyCause: proposal?.likelyCause ?? "",
        recommendation: proposal?.recommendation ?? "",
        description: proposal?.description ?? "",
    });

    // The operations of the reported works, for the "which operation must be redone" select.
    useEffect(() => {
        if (action !== "edit") return;
        setOperationsLoading(true);
        Promise.all(triage.works.map(work => OperationsService.getForWork({ workId: work.id })))
            .then(results => setOperations(results.flat()))
            .catch(() => showErrorNotification("Не удалось загрузить операции работ."))
            .finally(() => setOperationsLoading(false));
    }, [action, triage.works]);

    const operationOptions = useMemo(
        () =>
            operations.map(operation => ({
                value: operation.id,
                label: `${operation.ordinalNumber}. ${operation.operationType.name}`,
            })),
        [operations],
    );

    const closeModal = () => {
        setAction(null);
        setNote("");
        setNoteError("");
    };

    const submit = () => {
        if (!action) return;
        if (action === "reject" && !note.trim()) {
            setNoteError("Опишите, что не так с предложением — это попадёт в новую попытку.");
            return;
        }
        setIsSubmitting(true);
        const requestBody: { action: Action; note?: string; final?: Record<string, string> } = {
            action,
            note,
        };
        if (action === "edit") {
            requestBody.final = Object.fromEntries(
                Object.entries({
                    operation_id: final.operationId,
                    description: final.description,
                    defect_type: final.defectType,
                    severity: final.severity,
                    likely_cause: final.likelyCause,
                    recommendation: final.recommendation,
                }).filter(([, value]) => value.trim() !== ""),
            );
        }
        DefectsService.decideDefectTriage({ triageId: triage.id, requestBody })
            .then(() => {
                notifications.show({
                    title: "Решение сохранено",
                    message: DECISION_MESSAGES[action],
                    color: "green",
                });
                closeModal();
                onDecided();
            })
            .catch((error: unknown) => {
                // 400: the backend rejected the payload; 409: someone (or another tab) decided already.
                if (error instanceof ApiError && error.body) {
                    const body = error.body as Record<string, unknown>;
                    const detail = Object.entries(body)
                        .map(([field, messages]) => `${field}: ${String(messages)}`)
                        .join("; ");
                    if (detail) {
                        setNoteError(detail);
                        setIsSubmitting(false);
                        return;
                    }
                }
                showErrorNotification(
                    "Не удалось сохранить решение. Возможно, разбор уже решён — обновляем данные.",
                );
                setIsSubmitting(false);
                closeModal();
                onDecided();
            });
    };

    return (
        <Stack gap="sm" data-testid="decision-panel">
            <Text fw={600}>Решение</Text>
            <Group gap="sm">
                {(Object.keys(ACTION_TITLES) as Action[]).map(candidate => (
                    <Button
                        key={candidate}
                        variant={candidate === "dismiss" ? "outline" : "filled"}
                        color={ACTION_COLORS[candidate]}
                        onClick={() => setAction(candidate)}>
                        {ACTION_TITLES[candidate]}
                    </Button>
                ))}
            </Group>

            <Modal
                opened={action !== null}
                onClose={isSubmitting ? () => undefined : closeModal}
                title={action ? ACTION_TITLES[action] : ""}
                centered>
                <Stack gap="sm">
                    {action === "approve" && (
                        <Text size="sm">
                            Предложение будет применено: операция «{proposal?.operationName}» вернётся в работу,
                            врач получит уведомление.
                        </Text>
                    )}

                    {action === "edit" && (
                        <>
                            <Text size="sm">Поправьте то, что модель предложила неверно.</Text>
                            {operationsLoading ? (
                                <Group><Loader size="xs" /> <Text size="sm">Загружаем операции…</Text></Group>
                            ) : (
                                <Select
                                    label="Операция, которую нужно повторить"
                                    data={operationOptions}
                                    value={final.operationId}
                                    onChange={value =>
                                        setFinal(previous => ({ ...previous, operationId: value ?? "" }))
                                    }
                                    required
                                />
                            )}
                            <TextInput
                                label="Описание дефекта"
                                value={final.description}
                                onChange={event =>
                                    setFinal(previous => ({ ...previous, description: event.target.value }))
                                }
                            />
                            <Select
                                label="Тип дефекта"
                                data={Object.entries(DEFECT_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
                                value={final.defectType}
                                onChange={value =>
                                    setFinal(previous => ({ ...previous, defectType: value ?? "other" }))
                                }
                                required
                            />
                            <Select
                                label="Серьёзность"
                                data={Object.entries(DEFECT_SEVERITY_LABELS).map(([value, label]) => ({ value, label }))}
                                value={final.severity}
                                onChange={value =>
                                    setFinal(previous => ({ ...previous, severity: value ?? "medium" }))
                                }
                                required
                            />
                            <Textarea
                                label="Вероятная причина"
                                value={final.likelyCause}
                                onChange={event =>
                                    setFinal(previous => ({ ...previous, likelyCause: event.target.value }))
                                }
                            />
                            <Textarea
                                label="Рекомендация"
                                value={final.recommendation}
                                onChange={event =>
                                    setFinal(previous => ({ ...previous, recommendation: event.target.value }))
                                }
                            />
                        </>
                    )}

                    {action === "reject" && (
                        <>
                            <Text size="sm">
                                Система подготовит новое предложение с учётом вашего комментария. Опишите, что
                                не так с текущим:
                            </Text>
                            <Textarea
                                label="Комментарий для новой попытки"
                                value={note}
                                onChange={event => {
                                    setNote(event.target.value);
                                    if (event.target.value.trim()) setNoteError("");
                                }}
                                error={noteError}
                                required
                                autosize
                                minRows={3}
                            />
                        </>
                    )}

                    {action === "dismiss" && (
                        <>
                            <Text size="sm">Разбор будет закрыт, статусы заказа и работ не изменятся.</Text>
                            <Textarea
                                label="Комментарий (необязательно)"
                                value={note}
                                onChange={event => setNote(event.target.value)}
                                autosize
                                minRows={2}
                            />
                        </>
                    )}

                    <Group justify="flex-end" mt="sm">
                        <Button variant="default" onClick={closeModal} disabled={isSubmitting}>
                            Отмена
                        </Button>
                        <Button
                            color={action ? ACTION_COLORS[action] : "blue"}
                            onClick={submit}
                            loading={isSubmitting}>
                            Подтвердить
                        </Button>
                    </Group>
                </Stack>
            </Modal>
        </Stack>
    );
}
