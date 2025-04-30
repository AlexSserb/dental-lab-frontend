import { Accordion, Center, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { ToothMarks } from "components/ToothMarks";
import { useAdminOperations } from "../hooks/useAdminOperations";
import { OperationItem } from "./OperationItem";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";

export function AdminOperationsPage() {
    const { operations, work } = useAdminOperations();

    const renderOperations = operations.map(oper => (
        <OperationItem operation={oper} />
    ));

    return (
        <RoundedBoxContainer width="60%" minWidth="380px">
            <Stack gap="sm">
                <TitleWithBackButton
                    title={"Информация о работе"}
                    backRef={"/order"}
                />
                <Text>Тип работы: {work.workType.name}</Text>
                <Text>Количество: {work.amount}</Text>
                <Text>Статус: {work.workStatus.name}</Text>
                <Text>Формула:</Text>
                <Group>
                    <Paper shadow="md" p="sm">
                        <ToothMarks teethList={work.teeth} />
                    </Paper>
                </Group>
                <Divider />
                {operations?.length > 0 ? (
                    <>
                        <Center>
                            <Title order={4} p="sm">
                                Операции для работы
                            </Title>
                        </Center>
                        <Divider />
                        <Accordion>{renderOperations}</Accordion>
                    </>
                ) : (
                    <Center>
                        <Text>
                            Для работы нет операций, так как не оформлен наряд.
                        </Text>
                    </Center>
                )}
            </Stack>
        </RoundedBoxContainer>
    );
}
