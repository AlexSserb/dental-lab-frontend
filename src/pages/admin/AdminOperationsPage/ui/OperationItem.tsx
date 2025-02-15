import { Accordion, Box, Divider, Flex, Stack, Table, Text } from "@mantine/core";
import moment from "moment";
import { Link } from "react-router-dom";
import { getDepartmentName } from "utils/getDepartmentInfo";
import { formatTime } from "../../../../utils/formatDateTime.ts";
import { FullOperation, type OperationEvent } from "../../../../client";

type OperationItemProps = {
    operation: FullOperation;
};

export function OperationItem({ operation }: OperationItemProps) {
    const operationHistory = (history: OperationEvent[]) => {
        return history.map((entity: OperationEvent) => (
            <Table.Tr>
                <Table.Td>
                    {moment(entity.pghCreatedAt).format("DD.MM.YYYY HH:mm")}
                </Table.Td>
                <Table.Td>{entity.operationStatus.name}</Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <Accordion.Item key={operation.id} value={operation.id}>
            <Accordion.Control>
                <Flex direction={{ base: "column", sm: "row" }} gap="md">
                    <Stack>
                        <Text>Вид операции: {operation.operationType.name}</Text>
                        <Text>
                            {getDepartmentName(operation.operationType.group ?? "")}
                        </Text>
                        <Text>
                            Статус операции: {operation.operationStatus?.name}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text>
                            Время выполнения: {formatTime(operation.operationType.execTime)}
                        </Text>
                        {operation.tech ? (
                            <Text>
                                <>Назначена технику:</>
                                <Link
                                    to="/profile"
                                    state={{ email: operation.tech?.email }}>
                                    {operation.tech?.lastName} {operation.tech?.firstName}
                                </Link>
                            </Text>
                        ) : (
                            <Text>Техник не назначен</Text>
                        )}
                    </Stack>
                </Flex>
            </Accordion.Control>
            <Accordion.Panel>
                <Divider />
                <Box>
                    <Text py="sm">История изменений статусов:</Text>
                    <Table withTableBorder withColumnBorders striped>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Td>Дата и время</Table.Td>
                                <Table.Td>Статус</Table.Td>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {operationHistory(operation.history)}
                        </Table.Tbody>
                    </Table>
                </Box>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
