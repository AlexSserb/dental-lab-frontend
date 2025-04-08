import { Box, Button, Text } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { formatDateTime, formatStrTime } from "utils/formatDateTime";
import { getDepartmentName } from "utils/getDepartmentInfo";
import { OperationForProduct } from "../../../../client";

type OperationItemProps = {
    operation: OperationForProduct;
    getOperationStyle: (operationId: string) => string;
    selectOperation: (operation: OperationForProduct) => void;
};

function OperationItem({
    operation,
    getOperationStyle,
    selectOperation,
}: OperationItemProps) {
    return (
        <Box className={getOperationStyle(operation.id)}>
            <Box>
                <Text>Тип операции: {operation.operationType.name}</Text>
                <Text>
                    Группа: {getDepartmentName(operation.operationType.group)}
                </Text>
                <Text>
                    Время выполнения:{" "}
                    {formatStrTime(operation.operationType.execTime)}
                </Text>
                {operation.tech ? (
                    <Text>
                        Назначена технику: {operation.tech.lastName}{" "}
                        {operation.tech.firstName}
                    </Text>
                ) : (
                    <Text>Техник не назначен</Text>
                )}
                {operation.execStart ? (
                    <Text>
                        На дату и время: {formatDateTime(new Date(operation.execStart))}
                    </Text>
                ) : (
                    <Text>Время выполнения не назначено</Text>
                )}
            </Box>
            <Box my="xs">
                <Button onClick={() => selectOperation(operation)}>
                    <IconEdit />
                </Button>
            </Box>
        </Box>
    );
}

export default OperationItem;
