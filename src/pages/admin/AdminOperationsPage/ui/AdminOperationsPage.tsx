import { Accordion, Center, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { ToothMarks } from "components/ToothMarks";
import { useAdminOperations } from "../hooks/useAdminOperations";
import { OperationItem } from "./OperationItem";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";

export function AdminOperationsPage() {
    const { operations, product } = useAdminOperations();

    const renderOperations = operations.map(oper => (
        <OperationItem operation={oper} />
    ));

    return (
        <RoundedBoxContainer width="60%" minWidth="380px">
            <Stack gap="sm">
                <TitleWithBackButton
                    title={"Информация об изделии"}
                    backRef={"/order"}
                />
                <Text>Тип изделия: {product.productType.name}</Text>
                <Text>Количество: {product.amount}</Text>
                <Text>Статус: {product.productStatus.name}</Text>
                <Text>Формула:</Text>
                <Group>
                    <Paper shadow="md" p="sm">
                        <ToothMarks teethList={product.teeth} />
                    </Paper>
                </Group>
                <Divider />
                {operations?.length > 0 ? (
                    <>
                        <Center>
                            <Title order={4} p="sm">
                                Операции для изделия
                            </Title>
                        </Center>
                        <Divider />
                        <Accordion>{renderOperations}</Accordion>
                    </>
                ) : (
                    <Center>
                        <Text>
                            Для изделия нет операций, так как не оформлен наряд.
                        </Text>
                    </Center>
                )}
            </Stack>
        </RoundedBoxContainer>
    );
}
