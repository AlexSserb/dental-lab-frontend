import "dayjs/locale/ru";

import { MantineReactTable } from "mantine-react-table";

import {
    Button,
    Center,
    Divider,
    Group,
    Paper, ScrollArea,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useAdminOrderList from "../hooks/useAdminOrderList";

export function AdminOrderListPage() {
    const { selectedDate, saveSelectedDate, getOrders, orders, table } = useAdminOrderList();

    return (
        <RoundedBoxContainer minWidth="70%">
            <Stack>
                <Center>
                    <Title order={2}>Заказы</Title>
                </Center>
                <Divider />
                <Stack gap={10}>
                    <Group align="end">
                        <MonthPickerInput
                            size="md"
                            value={selectedDate}
                            label="Месяц для вывода заказов"
                            onChange={newValue => saveSelectedDate(newValue)}
                            minDate={new Date("01-01-2010")}
                            maxDate={new Date("01-01-2100")}
                        />
                        <Button
                            size="md"
                            type="submit"
                            onClick={getOrders}
                            variant="contained">
                            Показать заказы
                        </Button>
                    </Group>
                    {orders.length > 0 ? (
                        <ScrollArea>
                            <MantineReactTable table={table} />
                        </ScrollArea>
                    ) : (
                        <Paper my={"xl"}>
                            <Center>
                                <Text>Нет заказов</Text>
                            </Center>
                        </Paper>
                    )}
                </Stack>
            </Stack>
        </RoundedBoxContainer>
    );
}
