import "dayjs/locale/ru";

import { Button, Center, Divider, Paper, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { MantineReactTable } from "mantine-react-table";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useDefectTriageList from "../hooks/useDefectTriageList";

export function DefectTriageListPage() {
    const { table, fetchTriages, isEmpty, isLoading } = useDefectTriageList();

    return (
        <RoundedBoxContainer minWidth="60%">
            <Stack>
                <Center>
                    <Title order={2}>Разборы дефектов</Title>
                </Center>
                <Divider />
                <Stack gap={10}>
                    <Button
                        size="sm"
                        w={160}
                        leftSection={<IconRefresh size={16} />}
                        variant="default"
                        onClick={fetchTriages}
                        loading={isLoading}>
                        Обновить
                    </Button>
                    {!isEmpty ? (
                        <ScrollArea>
                            <MantineReactTable table={table} />
                        </ScrollArea>
                    ) : (
                        <Paper my="xl">
                            <Center>
                                <Stack align="center">
                                    <Text>Нет разборов дефектов</Text>
                                    <Text size="sm" c="dimmed">
                                        Новые разборы появятся, когда врач сообщит о дефекте.
                                    </Text>
                                </Stack>
                            </Center>
                        </Paper>
                    )}
                </Stack>
            </Stack>
        </RoundedBoxContainer>
    );
}
