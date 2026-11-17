import "dayjs/locale/ru";

import { Alert, Divider, Group, Loader, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconAlertTriangle, IconArrowBackUp, IconClockHour4 } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { Center } from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useDefectTriage from "../hooks/useDefectTriage";
import { DecisionPanel } from "./DecisionPanel";
import {
    DefectSeverityBadge,
    DefectTypeBadge,
    TriageStateBadge,
} from "utils/defectTriage";

function Field({ label, value }: { label: string; value?: string | number | null }) {
    if (value === undefined || value === null || value === "") return null;
    return (
        <Group gap="xs" wrap="nowrap" align="baseline">
            <Text size="sm" c="dimmed" w={220} style={{ flexShrink: 0 }}>
                {label}
            </Text>
            <Text size="sm">{value}</Text>
        </Group>
    );
}

export function DefectTriageReviewPage() {
    const { id } = useParams<{ id: string }>();
    const { triage, isLoading, notFound, refresh, isPolling } = useDefectTriage(id);

    if (isLoading && !triage) {
        return (
            <RoundedBoxContainer minWidth="60%">
                <Center mih={200}>
                    <Loader />
                </Center>
            </RoundedBoxContainer>
        );
    }

    if (notFound || !triage) {
        return (
            <RoundedBoxContainer minWidth="60%">
                <Stack align="center" mih={200} justify="center">
                    <Text>Разбор не найден.</Text>
                    <Link to="/defect-triage">← К списку разборов</Link>
                </Stack>
            </RoundedBoxContainer>
        );
    }

    const awaitingReview = triage.state === "awaiting_review";

    return (
        <RoundedBoxContainer minWidth="60%">
            <Stack>
                <Group justify="space-between" wrap="nowrap">
                    <Group wrap="nowrap">
                        <Link to="/defect-triage">← К списку</Link>
                        <Title order={2}>Разбор дефекта</Title>
                    </Group>
                    <TriageStateBadge state={triage.state} polling={isPolling} />
                </Group>
                <Divider />

                {triage.state === "processing" && (
                    <Alert icon={<Loader size={16} />} color="blue" variant="light">
                        Система готовит предложение: классифицирует дефект и подбирает операцию. Страница
                        обновится автоматически.
                    </Alert>
                )}
                {triage.state === "decided" && (
                    <Alert icon={<Loader size={16} />} color="indigo" variant="light">
                        Решение сохранено, система применяет его. Страница обновится автоматически.
                    </Alert>
                )}
                {triage.state === "failed" && (
                    <Alert icon={<IconAlertTriangle size={16} />} color="red" variant="light" title="Ошибка обработки">
                        {triage.error || "Разбор завершился ошибкой. Повторите отправку или решите вручную."}
                    </Alert>
                )}
                {triage.notifyError && (
                    <Alert icon={<IconAlertTriangle size={16} />} color="yellow" variant="light">
                        Не удалось отправить письмо врачу: {triage.notifyError}
                    </Alert>
                )}

                <Stack gap="xs">
                    <Field label="Заказ" value={triage.orderId} />
                    <Field label="Создано" value={new Date(triage.createdAt).toLocaleString("ru-RU")} />
                    {triage.decidedAt && (
                        <Field label="Решение принято" value={new Date(triage.decidedAt).toLocaleString("ru-RU")} />
                    )}
                    {triage.appliedAt && (
                        <Field label="Применено" value={new Date(triage.appliedAt).toLocaleString("ru-RU")} />
                    )}
                    {triage.notifiedAt && (
                        <Field label="Врач уведомлён" value={new Date(triage.notifiedAt).toLocaleString("ru-RU")} />
                    )}
                    <Field label="Пересмотры" value={triage.revisions} />
                </Stack>

                <Paper withBorder p="md">
                    <Stack gap="xs">
                        <Text fw={600}>Сообщение врача</Text>
                        <Text>{triage.comment || "—"}</Text>
                        <Text size="sm" c="dimmed">
                            Работы: {triage.works.map(work => work.name).join(", ") || "—"}
                        </Text>
                    </Stack>
                </Paper>

                {triage.proposal && (
                    <Paper withBorder p="md">
                        <Stack gap="xs">
                            <Text fw={600}>Классификация и предложение</Text>
                            <Group gap="xs">
                                <DefectTypeBadge defectType={triage.proposal.defectType} />
                                <DefectSeverityBadge severity={triage.proposal.severity} />
                            </Group>
                            <Text>{triage.proposal.description}</Text>
                            <Stack gap={4} mt="xs">
                                <Field
                                    label="Повторить операцию"
                                    value={triage.proposal.operationName}
                                />
                                <Field label="Вероятная причина" value={triage.proposal.likelyCause} />
                                <Field label="Рекомендация" value={triage.proposal.recommendation} />
                            </Stack>
                        </Stack>
                    </Paper>
                )}

                {awaitingReview && !triage.proposal && (
                    <Alert color="orange" variant="light" icon={<IconClockHour4 size={16} />}>
                        Предложения нет — разбор требует полностью ручного решения
                        {triage.error ? ` (${triage.error})` : ""}. Выберите операцию через «Утвердить с
                        правками» или закройте разбор.
                    </Alert>
                )}

                {triage.similarCases.length > 0 && (
                    <Paper withBorder p="md">
                        <Stack gap="sm">
                            <Text fw={600}>Похожие закрытые случаи</Text>
                            {triage.similarCases.map(similar => (
                                <Paper key={similar.id} withBorder p="sm" radius="sm">
                                    <Stack gap={4}>
                                        <Group gap="xs">
                                            <DefectTypeBadge defectType={similar.defectType} />
                                            <DefectSeverityBadge severity={similar.severity} />
                                            <Text size="xs" c="dimmed">
                                                похожесть {Math.round((1 - similar.distance) * 100)}%
                                            </Text>
                                        </Group>
                                        <Text size="sm">{similar.description}</Text>
                                        {similar.cause && (
                                            <Text size="sm" c="dimmed">
                                                <IconArrowBackUp
                                                    size={12}
                                                    style={{ display: "inline", verticalAlign: "middle" }}
                                                />{" "}
                                                Причина: {similar.cause}
                                            </Text>
                                        )}
                                        {similar.resolution && (
                                            <Text size="sm" c="dimmed">
                                                Решение: {similar.resolution}
                                            </Text>
                                        )}
                                    </Stack>
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                )}

                <ScrollArea>
                    {awaitingReview ? (
                        <DecisionPanel triage={triage} onDecided={refresh} />
                    ) : triage.decision ? (
                        <Paper withBorder p="md">
                            <Stack gap="xs">
                                <Text fw={600}>Решение</Text>
                                <Field label="Комментарий" value={triage.decisionNote} />
                                {triage.final?.operation_id && (
                                    <Field label="Повторить операцию" value={triage.final.operation_name} />
                                )}
                                {triage.final?.likely_cause && (
                                    <Field label="Вероятная причина" value={triage.final.likely_cause} />
                                )}
                                {triage.final?.recommendation && (
                                    <Field label="Рекомендация" value={triage.final.recommendation} />
                                )}
                            </Stack>
                        </Paper>
                    ) : null}
                </ScrollArea>
            </Stack>
        </RoundedBoxContainer>
    );
}
