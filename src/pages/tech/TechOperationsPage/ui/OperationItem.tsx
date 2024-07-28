import { Accordion, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { ToothMarks } from "components/ToothMarks";
import { ModalSetOperStatus } from "modals/ModalSetOperStatus";
import Operation from "types/OperationTypes/Operation";
import { OperationOption } from "../types/OperationOption";

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

const formatExecStartDateTime = (execStart: string) => {
    return (
        <>
            {execStart.substring(0, 10)} {execStart.substring(11, 16)}
        </>
    );
};

const getOperExecStart = (oper: Operation) => {
    return oper.execStart ? (
        <Text>Назначено на: {formatExecStartDateTime(oper.execStart)}</Text>
    ) : (
        <Text>Дата и время начала выполнения не указаны</Text>
    );
};

type OperationItemProps = {
    operation: Operation;
    operationStatuses: OperationOption[];
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
                            <Text>Информация об изделии</Text>
                            <Text>
                                Вид: {operation.product.productType.name}
                            </Text>
                            <Text>
                                Статус: {operation.product.productStatus.name}
                            </Text>
                            <Text>Количество: {operation.product.amount}</Text>
                            <ModalSetOperStatus
                                operation={operation}
                                operationStatuses={operationStatuses}
                                page={page}
                                loadOperations={loadOperations}
                            />
                        </Stack>
                    </Flex>
                    <Stack w="100%">
                        <Text>Формула для изделия</Text>
                        <ToothMarks teethList={operation.product.teeth} />
                    </Stack>
                </Flex>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
