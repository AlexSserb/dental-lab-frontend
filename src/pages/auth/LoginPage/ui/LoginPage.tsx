import { Alert, Anchor, Button, Center, Paper, Spoiler, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { LoginData } from "../types/LoginData";
import useLogin from "../hooks/useLogin";
import InlineButton from "../../../../components/InlineButton/InlineButton.tsx";

export function LoginPage() {
    const { message, loginUser } = useLogin();

    const form = useForm<LoginData>({
        mode: "uncontrolled",
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: value =>
                /^\S+@\S+$/.test(value) ? null : "Некорректный почтовый адрес",
        },
    });

    const loginDemonstrationButtons = (
        <Spoiler mt={10} maxHeight={0} showLabel="Вход для демонстрации" hideLabel="Скрыть">
            <Stack>
                <InlineButton
                    variant={"outline"}
                    onClick={() => loginUser({ email: "admin@gmail.com", password: "12345678" })}
                >
                    <Text>Войти за администратора</Text>
                </InlineButton>
                <InlineButton
                    variant={"outline"}
                    onClick={() => loginUser({ email: "tech1@gmail.com", password: "12345678" })}
                >
                    <Text>Войти за техника</Text>
                </InlineButton>
                <InlineButton
                    variant={"outline"}
                    onClick={() => loginUser({ email: "doctor@gmail.com", password: "12345678" })}
                >
                    <Text>Войти за клиента-врача</Text>
                </InlineButton>
            </Stack>
        </Spoiler>
    );

    return (
        <Center>
            <Paper w="30%" miw="380" shadow="md" radius="sm" px={50} py={30}>
                <Stack gap={20}>
                    <Center>
                        <Title>Вход</Title>
                    </Center>
                    <form
                        onSubmit={form.onSubmit((values: LoginData) =>
                            loginUser(values),
                        )}>
                        <TextInput
                            size="md"
                            mb={20}
                            withAsterisk
                            label="Почта"
                            placeholder="your@email.com"
                            key={form.key("email")}
                            {...form.getInputProps("email")}
                        />

                        <TextInput
                            type="password"
                            size="md"
                            mb={30}
                            withAsterisk
                            label="Пароль"
                            key={form.key("password")}
                            {...form.getInputProps("password")}
                        />
                        <Anchor href="/registration" mb={20}>
                            Зарегистрироваться
                        </Anchor>
                        {message && (
                            <Alert variant="error" mt={30}>
                                {message}
                            </Alert>
                        )}
                        {loginDemonstrationButtons}
                        <Center mt={20}>
                            <Button size="md" type="submit">
                                Войти
                            </Button>
                        </Center>
                    </form>
                </Stack>
            </Paper>
        </Center>
    );
}
