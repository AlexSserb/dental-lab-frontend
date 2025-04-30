import { useState } from "react";
import { Box, Button, Modal, Radio, Stack, Table, Textarea } from "@mantine/core";
import { useDisclosure, useSet } from "@mantine/hooks";
import { Order, OrdersService, Work } from "../../../client";

type Props = {
    order: Order;
    works: Work[];
    refetchOrder: (order: Order) => void;
}

export const ModalReportAboutDefect = ({ order, works, refetchOrder }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [commentAfterAccept, setCommentAfterAccept] = useState<string>("");
    const selectedWorkIds = useSet<string>([]);

    const handleCloseModal = () => {
        setCommentAfterAccept("");
        close();
    };

    const onSubmit = () => {
        OrdersService.reportDefect({
            requestBody: {
                order: order.id,
                works: [...selectedWorkIds],
                commentAfterAccept,
            },
        })
            .then(() => {
                refetchOrder(order);
                handleCloseModal();
            })
            .catch(err => console.log(err));
    };

    const renderWorks = () => (
        <Table withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Td w="10%"></Table.Td>
                    <Table.Td>Тип работы</Table.Td>
                    <Table.Td w="20%">
                        Кол-во
                    </Table.Td>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {works.map((work) => (
                    <Table.Tr key={work.id}>
                        <Table.Td>
                            <Radio
                                checked={selectedWorkIds.has(work.id)}
                                onClick={() => {
                                    if (selectedWorkIds.has(work.id)) {
                                        selectedWorkIds.delete(work.id);
                                    } else {
                                        selectedWorkIds.add(work.id);
                                    }
                                }}
                            />
                        </Table.Td>
                        <Table.Td>
                            {work.workType.name}
                        </Table.Td>
                        <Table.Td>
                            {work.amount}
                        </Table.Td>
                    </Table.Tr>
                ))}
            </Table.Tbody>
        </Table>
    );

    return (
        <Stack>
            <Button variant={"outline"} color={"red"} onClick={open}>
                Сообщить о браке
            </Button>
            <Modal opened={opened} onClose={close} title="Сообщение о браке">
                <Stack>
                    <Textarea
                        mb={10}
                        label="Комментарий"
                        value={commentAfterAccept}
                        onChange={event => setCommentAfterAccept(event.target.value)}
                        maxLength={500}
                    />
                    <Box>Выберите бракованые работы:</Box>
                    {renderWorks()}
                    <Button
                        onClick={onSubmit}
                        mb={10}
                        variant="contained"
                    >
                        Сообщить о браке
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
};
