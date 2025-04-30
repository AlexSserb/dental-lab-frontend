import { IconSquareX } from "@tabler/icons-react";
import { ToothMarks } from "components/ToothMarks";
import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Group,
    Paper,
    ScrollArea,
    Stack,
    Table,
    Text,
    Textarea,
    TextInput,
    Title,
    UnstyledButton,
} from "@mantine/core";
import useCreateOrderPage from "../hooks/useCreateOrderPage";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useFillJawArrays from "../../../../components/ToothMarks/hooks/useFillJawArrays.tsx";
import CustomerSelect from "../../../../components/CustomerSelect/CustomerSelect.tsx";
import WorkTypeSelect from "../../../../components/WorkTypeSelect/WorkTypeSelect.tsx";

export const CreateOrderPage = () => {
    const {
        listOfWorks,
        handleDelete,
        setSelectedWorkType,
        numberOfWorks,
        setNumberOfWorks,
        selectedCustomer,
        setSelectedCustomer,
        comment,
        setComment,
        getToothMark,
        orderCost,
        saveWork,
        sendOrder,
    } = useCreateOrderPage();

    const { upperJaw, lowerJaw } = useFillJawArrays();

    const addWorkdays = (startDate: Date, workdays: number) => {
        const date = new Date(startDate);
        let daysAdded = 0;

        while (daysAdded < workdays) {
            date.setDate(date.getDate() + 1); // Add 1 day

            // Check if it's a weekday (0=Sunday, 1=Monday, ..., 6=Saturday)
            if (date.getDay() !== 0 && date.getDay() !== 6) {
                daysAdded++;
            }
        }

        return date;
    };

    const getDeadline = () => {
        const curr = new Date();
        return addWorkdays(curr, 7);
    };

    const renderWorks = () => {
        return listOfWorks.map((work, i) => (
            <Table.Tr key={i}>
                <Table.Td>{i + 1}</Table.Td>
                <Table.Td>{work.workTypeName}</Table.Td>
                <Table.Td>{work.amount}</Table.Td>
                <Table.Td>{work.workTypeCost.toFixed(2)}</Table.Td>
                <Table.Td>{work.sumCost.toFixed(2)}</Table.Td>
                <Table.Td>
                    <ToothMarks teethList={work.teeth} />
                </Table.Td>
                <Table.Td>
                    <UnstyledButton
                        className="px-0"
                        onClick={() => handleDelete(work)}>
                        <IconSquareX />
                    </UnstyledButton>
                </Table.Td>
            </Table.Tr>
        ));
    };

    const renderTeethMarks = () => {
        return (
            <Paper shadow="lg">
                <ScrollArea scrollbars="x">
                    <table>
                        <tbody>
                        <tr>
                            {upperJaw.map(tooth => {
                                return <td>{getToothMark(tooth)}</td>;
                            })}
                        </tr>
                        <tr>
                            {lowerJaw.map(tooth => {
                                return <td>{getToothMark(tooth)}</td>;
                            })}
                        </tr>
                        </tbody>
                    </table>
                </ScrollArea>
            </Paper>
        );
    };

    return (
        <Center>
            <RoundedBoxContainer width="70%" minWidth="370px" padding={20}>
                <Center>
                    <Title order={3} mb={15}>
                        Оформление заказа
                    </Title>
                </Center>

                <Box>
                    <Flex gap={10}>
                        <WorkTypeSelect onChange={setSelectedWorkType} />

                        <TextInput
                            w="100%"
                            label="Количество"
                            type="number"
                            min="1"
                            max="32"
                            step="1"
                            value={numberOfWorks}
                            onChange={e =>
                                setNumberOfWorks(Number(e.target.value))
                            }
                        />
                    </Flex>

                    <br />
                    <Text>Зубная формула</Text>
                    <Group>{renderTeethMarks()}</Group>
                    <br />

                    <Button
                        type="button"
                        variant="contained"
                        color="success"
                        onClick={() => saveWork()}>
                        Добавить работу
                    </Button>
                    <Divider my={20} />
                </Box>

                <Box>
                    {listOfWorks.length > 0 ? (
                        <Stack>
                            <Center>
                                <Title order={3}>Данные о заказе</Title>
                            </Center>
                            <Textarea
                                label="Комментарий к заказу"
                                maxLength={512}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                            />
                            <Flex
                                direction={{ base: "column", sm: "row" }}
                                gap={10}>
                                <CustomerSelect
                                    value={selectedCustomer}
                                    onChange={setSelectedCustomer}
                                />
                                <TextInput
                                    label={"Крайний срок выполнения"}
                                    w={"100%"}
                                    value={getDeadline().toLocaleDateString("ru")}
                                    readOnly
                                />
                            </Flex>
                            <Text>
                                Сумма: {orderCost.toFixed(2)} руб.
                            </Text>
                            <Button
                                variant="contained"
                                type="button"
                                onClick={() => sendOrder()}>
                                <Title order={4} p={10}>
                                    Заказать
                                </Title>
                            </Button>
                            <Paper>
                                <ScrollArea scrollbars="x">
                                    <Table>
                                        <Table.Thead>
                                            <Table.Tr>
                                                <Table.Th>№</Table.Th>
                                                <Table.Th>Тип работы</Table.Th>
                                                <Table.Th>Кол-во</Table.Th>
                                                <Table.Th>
                                                    Цена за 1 шт.
                                                </Table.Th>
                                                <Table.Th>Сумма</Table.Th>
                                                <Table.Th>Отметки</Table.Th>
                                                <Table.Th></Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {renderWorks()}
                                        </Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Paper>
                        </Stack>
                    ) : (
                        <Center>
                            <Title order={5}>
                                Еще ни одной работы для заказа не добавлено
                            </Title>
                        </Center>
                    )}
                </Box>
            </RoundedBoxContainer>
        </Center>
    );
};
