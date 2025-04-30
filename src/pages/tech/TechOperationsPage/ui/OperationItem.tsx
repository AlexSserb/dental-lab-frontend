import { Accordion, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { ToothMarks } from "components/ToothMarks";
import { ModalSetOperationStatus } from "modals/ModalSetOperStatus";
import { formatDateTime } from "../../../../utils/formatDateTime.ts";
import { Operation } from "../../../../client";
import { Option } from "../../../../types/Option.ts";

const formatExecTime = (execTime: string) => {
    const hours = Number(execTime.substring(0, 2));
    const minutes = Number(execTime.substring(3, 5));
    if (hours === 0) {
        return <>{minutes} мин.</>;
    }
    return (
        <>
            {hours} ч. {minutes} мин.
        </>
    );
};

const getOperExecStart = (oper: Operation) => {
    return oper.execStart ? (
        <Text>Назначено на: {formatDateTime(new Date(oper.execStart))}</Text>
    ) : (
        <Text>Дата и время начала выполнения не указаны</Text>
    );
};

type OperationItemProps = {
    operation: Operation;
    operationStatuses: Option[];
    page: number;
    loadOperations: (page: number) => void;
};

export function OperationItem({
    operation,
    operationStatuses,
    page,
    loadOperations,
}: OperationItemProps) {
    return (
        <Accordion.Item key={operation.id} value={operation.id}>
            <Accordion.Control>
                <Group>
                    <Stack>
                        <Text>
                            Вид операции: {operation.operationType.name}
                        </Text>
                        <Text>
                            Статус операции: {operation.operationStatus?.name}
                        </Text>
                    </Stack>
                    <Divider />
                    <Stack>
                        {getOperExecStart(operation)}
                        <Text>
                            На выполнение:{" "}
                            {formatExecTime(operation.operationType.execTime)}
                        </Text>
                    </Stack>
                </Group>
            </Accordion.Control>
            <Divider />
            <Accordion.Panel>
                <Flex
                    direction={{ base: "column", sm: "row" }}
                    justify="space-between">
                    <Flex w="100%" justify={"space-between"}>
                        <Stack gap={5}>
                            <Text>Информация о работе</Text>
                            <Text>
                                Вид: {operation.work.workType.name}
                            </Text>
                            <Text>
                                Статус: {operation.work.workStatus.name}
                            </Text>
                            <Text>Количество: {operation.work.amount}</Text>
                            <ModalSetOperationStatus
                                operation={operation}
                                operationStatuses={operationStatuses}
                                page={page}
                                loadOperations={loadOperations}
                            />
                        </Stack>
                    </Flex>
                    <Stack w="100%">
                        <Text>Зубная формула</Text>
                        <ToothMarks teethList={operation.work.teeth} />
                    </Stack>
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
