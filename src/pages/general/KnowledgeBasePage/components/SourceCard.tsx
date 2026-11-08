import { Accordion, Badge, Group, Text } from "@mantine/core";
import { KnowledgeSource } from "../../../../client";

const DOC_TYPE_LABELS: Record<string, string> = {
    procedure: "Процедура",
    material: "Материал",
    defect: "Дефект",
};

type Props = {
    source: KnowledgeSource;
};

/** One retrieved fragment. `cited` tells whether the model referred to it as [number] in its answer. */
export const SourceCard = ({ source }: Props) => (
    <Accordion.Item value={String(source.number)}>
        <Accordion.Control>
            <Group gap="xs" wrap="nowrap">
                <Text fw={600}>[{source.number}]</Text>
                <Text lineClamp={1}>{source.documentTitle}</Text>
                <Badge variant="light" size="sm">{DOC_TYPE_LABELS[source.docType] ?? source.docType}</Badge>
                <Badge variant="outline" color="gray" size="sm">{source.operationType}</Badge>
                {source.cited && <Badge color="green" size="sm">в ответе</Badge>}
            </Group>
        </Accordion.Control>
        <Accordion.Panel>
            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>{source.fragment}</Text>
            <Text size="xs" c="dimmed" mt="xs">
                {source.documentPath} · расстояние {source.distance.toFixed(3)}
            </Text>
        </Accordion.Panel>
    </Accordion.Item>
);
