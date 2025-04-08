import { Button, Checkbox, Divider, Drawer, Stack, Text } from "@mantine/core";
import { formatDateTime, formatStrTime } from "../../utils/formatDateTime.ts";
import { useOperationEditContext } from "./contexts/OperationEditContext.tsx";
import WorkStartDateTimePicker from "../WorkStartDateTimePicker/WorkStartDateTimePicker.tsx";


type Props = {
    refetchOperations: () => void;
}

const OperationEditDrawer = ({ refetchOperations }: Props) => {
    const {
        opened,
        close,
        updateOperation,
        operation,
        setOperation,
    } = useOperationEditContext();

    if (!operation) return;

    return (
        <Drawer
            position={"left"}
            opened={opened}
            onClose={close}
            title="Операция"
        >
            <Stack gap="xs">
                <Divider />
                <Text>Тип операции: {operation.operationType.name}</Text>
                <Text>
                    Время выполнения:{" "}
                    {formatStrTime(operation.operationType.execTime)}
                </Text>
                <Text>Статус операции: {operation.operationStatus.name}</Text>
                <Divider />
                <Stack gap={0}>
                    <Text>Начало выполнения:</Text>
                    <WorkStartDateTimePicker
                        my="xs"
                        value={new Date(operation.start)}
                        onChange={value =>
                            value && setOperation({ ...operation, start: formatDateTime(value) })
                        }
                    />
                </Stack>
                <Checkbox
                    label={"Зафиксирована"}
                    checked={!operation.editable}
                    onChange={value => setOperation({ ...operation, editable: !value.target.checked })}
                />
                <Button onClick={() => updateOperation(operation, refetchOperations)}>
                    Сохранить изменения
                </Button>
            </Stack>
        </Drawer>
    );
};

export default OperationEditDrawer;
