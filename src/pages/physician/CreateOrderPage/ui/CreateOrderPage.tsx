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
    Text, Textarea,
    TextInput,
    Title,
    UnstyledButton,
} from "@mantine/core";
import useCreateOrderPage from "../hooks/useCreateOrderPage";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import useFillJawArrays from "../../../../components/ToothMarks/hooks/useFillJawArrays.tsx";
import CustomerSelect from "../../../../components/CustomerSelect/CustomerSelect.tsx";
import ProductTypeSelect from "../../../../components/ProductTypeSelect/ProductTypeSelect.tsx";

export const CreateOrderPage = () => {
    const {
        listOfProducts,
        handleDelete,
        setSelectedProductType,
        numberOfProducts,
        setNumberOfProducts,
        selectedCustomer,
        setSelectedCustomer,
        comment,
        setComment,
        getToothMark,
        orderCost,
        saveProduct,
        sendOrder,
    } = useCreateOrderPage();

    const { upperJaw, lowerJaw } = useFillJawArrays();

    const renderProducts = () => {
        return listOfProducts.map((product, i) => (
            <Table.Tr key={i}>
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
                    <Title order={3} mb={15}>
                        Оформление заказа
                    </Title>
                </Center>

                <Box>
                    <Flex gap={10}>
                        <ProductTypeSelect onChange={setSelectedProductType} />

                        <TextInput
                            w="100%"
                            label="Количество"
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
                    <Divider my={20} />
                </Box>

                <Box>
                    {listOfProducts.length > 0 ? (
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
                            <CustomerSelect
                                value={selectedCustomer}
                                onChange={setSelectedCustomer}
                            />
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
