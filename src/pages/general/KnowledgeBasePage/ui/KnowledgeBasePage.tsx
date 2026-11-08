import { Accordion, Alert, Button, Center, Divider, Group, Paper, Select, Stack, Text, Textarea, Title } from "@mantine/core";
import { IconBook, IconInfoCircle } from "@tabler/icons-react";
import useKnowledgeBase, {
    EXAMPLE_QUESTIONS,
    MAX_QUESTION_LENGTH,
    OPERATION_TYPES,
    OperationType,
} from "../hooks/useKnowledgeBase.tsx";
import { SourceCard } from "../components/SourceCard.tsx";

export function KnowledgeBasePage() {
    const { question, setQuestion, operationType, setOperationType, loading, result, askedQuestion, ask } =
        useKnowledgeBase();

    return (
        <Center>
            <Paper w="60%" miw={380} maw={900} shadow="md" radius="sm" px={40} py={30}>
                <Stack gap="md">
                    <Center>
                        <Title order={3}>База знаний лаборатории</Title>
                    </Center>
                    <Divider />

                    <Select
                        label="Отдел"
                        description="Искать только в документах выбранного отдела"
                        placeholder="Все отделы"
                        data={OPERATION_TYPES}
                        value={operationType}
                        onChange={value => setOperationType(value as OperationType | null)}
                        clearable
                        w={260}
                    />
                    <Textarea
                        label="Вопрос"
                        placeholder="Например: Что делать, если скол керамики после обжига?"
                        autosize
                        minRows={2}
                        maxLength={MAX_QUESTION_LENGTH}
                        value={question}
                        onChange={e => setQuestion(e.currentTarget.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                                e.preventDefault();
                                ask();
                            }
                        }}
                    />
                    <Group gap="xs">
                        {EXAMPLE_QUESTIONS.map(example => (
                            <Button
                                key={example}
                                variant="subtle"
                                size="compact-xs"
                                disabled={loading}
                                onClick={() => ask(example)}>
                                {example}
                            </Button>
                        ))}
                    </Group>
                    <Button
                        leftSection={<IconBook size={18} />}
                        loading={loading}
                        disabled={!question.trim()}
                        onClick={() => ask()}
                        w="fit-content">
                        Спросить
                    </Button>

                    {result && (
                        <Stack gap="sm">
                            <Divider label={askedQuestion} labelPosition="left" />
                            {result.answered ? (
                                <Text style={{ whiteSpace: "pre-wrap" }}>{result.answer}</Text>
                            ) : (
                                <Alert color="yellow" icon={<IconInfoCircle />} title="Ничего не найдено">
                                    {result.answer} Попробуйте переформулировать вопрос или выбрать другой отдел.
                                </Alert>
                            )}
                            {result.answered && (
                                <Text size="xs" c="dimmed">
                                    Ответ сформирован ИИ по документам ниже и может содержать неточности - проверяйте
                                    по источникам.
                                </Text>
                            )}
                            {result.sources.length > 0 && (
                                <>
                                    <Title order={5}>Источники</Title>
                                    <Accordion variant="separated">
                                        {result.sources.map(source => (
                                            <SourceCard key={source.number} source={source} />
                                        ))}
                                    </Accordion>
                                </>
                            )}
                        </Stack>
                    )}
                </Stack>
            </Paper>
        </Center>
    );
}
