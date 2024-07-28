import { Accordion, Box, Center, Pagination, Title } from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { OperationItem } from "./OperationItem";
import useTechOperation from "../hooks/useTechOperation";

export function TechOperationsPage() {
    const {
        operations,
        totalPages,
        page,
        handleChangePage,
        operationStatuses,
        loadOperations,
    } = useTechOperation();

    const operationItems = operations.map(oper => (
        <OperationItem
            key={oper.id}
            operation={oper}
            operationStatuses={operationStatuses}
            page={page}
            loadOperations={loadOperations}
        />
    ));

    return (
        <Center>
            <RoundedBoxContainer width="70%" minWidth="400px">
                <Box>
                    <Center>
                        <Title order={2} pb={10}>
                            Назначенные операции
                        </Title>
                    </Center>
                    {operations.length > 0 ? (
                        <>
                            <Pagination
                                total={totalPages}
                                value={page}
                                onChange={handleChangePage}
                                variant="outlined"
                                my={20}
                            />
                            <Accordion variant="separated">
                                {operationItems}
                            </Accordion>
                            <Pagination
                                total={totalPages}
                                value={page}
                                onChange={handleChangePage}
                                variant="outlined"
                                mt={20}
                            />
                        </>
                    ) : (
                        <Center>
                            <Title order={4}>Нет назначенных операций</Title>
                        </Center>
                    )}
                </Box>
            </RoundedBoxContainer>
        </Center>
    );
}
