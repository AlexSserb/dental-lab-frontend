import { Accordion, Box, Divider, Flex, Stack, Table, Text } from "@mantine/core";
import moment from "moment";
import { Link } from "react-router-dom";

import {
    FullOperation,
    OperationHistory,
} from "types/OperationTypes/Operation";
import { getDepartmentName } from "utils/getDepartmentInfo";
import { formatTime } from "../../../../utils/formatDateTime.ts";

type OperationItemProps = {
    oper: FullOperation;
};

export function OperationItem({ oper }: OperationItemProps) {
    const operationHistory = (history: OperationHistory[]) => {
        return history.map((entity: OperationHistory) => (
            <Table.Tr>
                <Table.Td>
                    {moment(entity.pghCreatedAt).format("DD.MM.YYYY HH:mm")}
                </Table.Td>
                <Table.Td>{entity.operationStatus.name}</Table.Td>
            </Table.Tr>
        ));
    };

    return (
        <Accordion.Item key={oper.id} value={oper.id}>
            <Accordion.Control>
                <Flex direction={{ base: "column", sm: "row" }} gap="md">
                    <Stack>
                        <Text>Вид операции: {oper.operationType.name}</Text>
                        <Text>
                            {getDepartmentName(oper.operationType.group)}
                        </Text>
                        <Text>
                            Статус операции: {oper.operationStatus?.name}
                        </Text>
                    </Stack>
                    <Stack>
                        <Text>
                            Время выполнения: {formatTime(oper.operationType.execTime)}
                        </Text>
                        {oper.tech ? (
                            <Text>
                                <>Назначена технику: </>
                                <Link
                                    to="/profile"
                                    state={{ email: oper.tech?.email }}>
                                    {oper.tech?.lastName} {oper.tech?.firstName}
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
                            {operationHistory(oper.history)}
                        </Table.Tbody>
                    </Table>
                </Box>
            </Accordion.Panel>
        </Accordion.Item>
    );
}
