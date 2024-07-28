import "dayjs/locale/ru";

import { MantineReactTable } from "mantine-react-table";

import {
    Button,
    Center,
    Divider,
    Group,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useAdminOrderList from "../hooks/useAdminOrderList";

export function AdminOrderListPage() {
    const { selectedDate, saveSelectedDate, getOrders, orders, table } =
        useAdminOrderList();

    return (
        <RoundedBoxContainer minWidth="380px">
            <Stack>
                <Center>
                    <Title order={1}>Заказы</Title>
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
                        <MantineReactTable table={table} />
                    ) : (
                        <Paper>
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
