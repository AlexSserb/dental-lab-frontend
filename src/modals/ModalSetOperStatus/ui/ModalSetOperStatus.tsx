import {
    Button,
    Modal,
    Stack,
    Title,
    Text,
    Select,
    Center,
    Divider,
} from "@mantine/core";
import { ToothMarks } from "components/ToothMarks";
import { OperationOption } from "pages/TechOperationsPage/types/OperationOption";
import { useState } from "react";
import operationService from "services/OperationService";
import Operation from "types/OperationTypes/Operation";

interface ModalSetOperStatusProps {
    operation: Operation;
    page: number;
    operationStatuses: OperationOption[];
    loadOperations: (page: number) => void;
}

export const ModalSetOperStatus = ({
    operation,
    page,
    operationStatuses,
    loadOperations,
}: ModalSetOperStatusProps) => {
    const [open, setOpen] = useState(false);
    const [selectedOperationStatus, setSelectedOperationStatus] = useState<
        string | null
    >(operation?.operationStatus?.name ?? null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        const status = operationStatuses.find(
            operSt => operSt.value === selectedOperationStatus
        );
        if (!status) return;

        operationService
            .setOperationStatus(operation.id, status?.key)
            .then(_ => {
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
                        data={operationStatuses.map(
                            operation => operation.value
                        )}
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
                            Информация об изделии
                        </Text>
                    </Center>
                    <Divider />

                    <Text>Вид: {operation.product.productType.name}</Text>
                    <Text>Статус: {operation.product.productStatus.name}</Text>
                    <Text>Количество: {operation.product.amount}</Text>
                    <Text>Формула для изделия</Text>
                    <ToothMarks teethList={operation.product.teeth} />
                </Stack>
            </Modal>
        </Stack>
    );
};
