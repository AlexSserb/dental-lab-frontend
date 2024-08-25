import { IconSquareX } from "@tabler/icons-react";
import { ToothMarks } from "components/ToothMarks";
import {
    Button,
    Center,
    Text,
    Paper,
    Select,
    Stack,
    Table,
    TextInput,
    Title,
    Divider,
    Box,
    ScrollArea,
    UnstyledButton,
    Flex,
    Group,
} from "@mantine/core";
import useCreateOrderPage from "../hooks/useCreateOrderPage";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useFillJawArrays from "../../../../components/ToothMarks/hooks/useFillJawArrays.tsx";

export const CreateOrderPage = () => {
    const {
        listOfProducts,
        allProductTypes,
        handleDelete,
        selectedProductType,
        setSelectedProductType,
        numberOfProducts,
        setNumberOfProducts,
        customers,
        selectedCustomer,
        setSelectedCustomer,
        getToothMark,
        orderCost,
        saveProduct,
        sendOrder,
    } = useCreateOrderPage();

    const { upperJaw, lowerJaw } = useFillJawArrays();

    const renderProducts = () => {
        return listOfProducts.map((product, i) => (
            <Table.Tr>
                <Table.Td>{i + 1}</Table.Td>
                <Table.Td>{product.productTypeName}</Table.Td>
                <Table.Td>{product.amount}</Table.Td>
                <Table.Td>{product.productTypeCost.toFixed(2)}</Table.Td>
                <Table.Td>{product.sumCost.toFixed(2)}</Table.Td>
                <Table.Td>
                    <ToothMarks teethList={product.teeth} />
                </Table.Td>
                <Table.Td>
                    <UnstyledButton
                        className="px-0"
                        onClick={() => handleDelete(product)}>
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
                    <Title order={3} mb={10}>
                        Оформление заказа
                    </Title>
                </Center>
                <Box>
                    <Flex gap={10}>
                        <Select
                            w="100%"
                            label="Тип изделия"
                            required
                            onChange={value => setSelectedProductType(value)}
                            value={selectedProductType}
                            data={allProductTypes.map(
                                productType => productType.name,
                            )}
                        />

                        <TextInput
                            w="100%"
                            label="Количество"
                            required
                            type="number"
                            min="1"
                            max="32"
                            step="1"
                            value={numberOfProducts}
                            onChange={e =>
                                setNumberOfProducts(Number(e.target.value))
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
                        onClick={() => saveProduct()}>
                        Добавить изделие
                    </Button>
                    <Divider my={30} />
                </Box>

                <Box>
                    {listOfProducts.length > 0 ? (
                        <Stack>
                            <Center>
                                <Title order={3}>Данные о заказе</Title>
                            </Center>
                            <Select
                                w="100%"
                                label="Заказчик"
                                required
                                onChange={setSelectedCustomer}
                                value={selectedCustomer}
                                data={customers}
                            />
                            <Text my={10}>
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
                                                <Table.Th>Тип изделия</Table.Th>
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
                                            {renderProducts()}
                                        </Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Paper>
                        </Stack>
                    ) : (
                        <Center>
                            <Title order={5}>
                                Еще ни одного изделия для заказа не добавлено
                            </Title>
                        </Center>
                    )}
                </Box>
            </RoundedBoxContainer>
        </Center>
    );
};
