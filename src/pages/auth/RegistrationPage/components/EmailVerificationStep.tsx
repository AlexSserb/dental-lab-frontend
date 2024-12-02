import { useUserContext } from "../../../../contexts/UserContext/useUserContext.ts";
import { Button, Center, em, Group, Paper, Text, Title } from "@mantine/core";
import { IconMailFast } from "@tabler/icons-react";
import { postEmailVerification } from "../api/registrationApi.ts";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

const EmailVerificationStep = () => {
    const { user } = useUserContext();

    const [disable, setDisable] = useState(false);
    const handleDisable = () => {
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
        }, 10000);
    };

    const sendEmailVerification = () => {
        postEmailVerification()
            .then((res) => {
                console.log(res);
                notifications.show({
                    message: "Сообщение для подтверждения почты отправлено",
                });
            })
            .catch(err => console.log(err))
            .finally(() => handleDisable());
    };

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
                <Title order={2}>Подтверждение почты</Title>
                <Text>
                    Ссылка для подтверждения почты была отправлена по адресу {user?.email}
                </Text>
                <Button
                    disabled={disable}
                    onClick={sendEmailVerification}
                    variant={"contained"}
                >
                    <Group gap={15}>
                        <IconMailFast />
                        Отправить еще раз
                    </Group>
                </Button>
            </Paper>
        </Center>
    );
};

export default EmailVerificationStep;
