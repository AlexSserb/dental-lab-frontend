import { Button, Center, Divider, Modal, Select, Stack, Text, Title } from "@mantine/core";
import { ToothMarks } from "components/ToothMarks";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { Operation, OperationsService } from "../../../client";
import { Option } from "../../../types/Option.ts";

interface Props {
    operation: Operation;
    page: number;
    operationStatuses: Option[];
    loadOperations: (page: number) => void;
}

export const ModalSetOperationStatus = ({
                                       operation,
                                       page,
                                       operationStatuses,
                                       loadOperations,
                                   }: Props) => {
    const [open, setOpen] = useState(false);
    const [selectedOperationStatus, setSelectedOperationStatus] = useState<
        string | null
    >(operation?.operationStatus?.id ?? null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (!selectedOperationStatus) {
            notifications.show({
                title: "Error",
                message: "Статус операции не выбран.",
            })
            return;
        }

        OperationsService.updateOperationStatus({
            requestBody: {
                status: selectedOperationStatus,
            },
            operationId: operation.id,
        })
            .then(() => {
                loadOperations(page);
            })
            .catch(err => console.log(err));

        handleClose();
    };

    return (
        <Stack>
            <Button variant="contained" mb={10} onClick={handleOpen}>
                Изменить статус операции
            </Button>
            <Modal
                opened={open}
                onClose={handleClose}
                title="Изменение статуса операции">
                <Title order={4}></Title>
                <Stack gap={10}>
                    <Text>Статус операции</Text>
                    <Select
                        onChange={value => setSelectedOperationStatus(value)}
                        value={selectedOperationStatus}
                        data={operationStatuses}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Сохранить
                    </Button>
                    <Divider />
                    <Center>
                        <Text>Информация об операции</Text>
                    </Center>
                    <Divider />
                    <Text>Вид операции: {operation.operationType.name}</Text>
                    <Text>
                        Время выполнения:{" "}
                        {operation.operationType.execTime.substring(0, 2)}:
                        {operation.operationType.execTime.substring(3, 5)}
                    </Text>

                    <Divider />
                    <Center>
                        <Text variant="h6" component="h6">
                            Информация о работе
                        </Text>
                    </Center>
                    <Divider />

                    <Text>Вид: {operation.work.workType.name}</Text>
                    <Text>Статус: {operation.work.workStatus.name}</Text>
                    <Text>Количество: {operation.work.amount}</Text>
                    <Text>Формула для работы</Text>
                    <ToothMarks teethList={operation.work.teeth} />
                </Stack>
            </Modal>
        </Stack>
    );
};
