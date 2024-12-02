import { Button, Center, em, Group, Paper, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconDental } from "@tabler/icons-react";

const FinishStep = () => {
    const navigate = useNavigate();

    return (
        <Center>
            <Paper
                miw="300"
                shadow="md"
                radius="sm"
                px={em(40)}
                py={em(20)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: em(40),
                }}
            >
                <Title order={2}>Вы успешно зарегистрированы</Title>
                <Button onClick={() => navigate("/")}>
                    <Group gap={15}>
                        <IconDental />
                        Перейти к оформлению первого заказа
                    </Group>
                </Button>
            </Paper>
        </Center>
    );
};

export default FinishStep;
