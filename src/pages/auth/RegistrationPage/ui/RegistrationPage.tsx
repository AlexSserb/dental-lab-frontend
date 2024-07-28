import {
    Alert,
    Anchor,
    Button,
    Center,
    Paper,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RegistrationData } from "../types/RegistrationData";
import useRegistration from "../hooks/useRegistration";

export function RegistrationPage() {
    const { message, registerUser } = useRegistration();

    const form = useForm<RegistrationData>({
        mode: "uncontrolled",
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },

        validate: {
            email: value =>
                /^\S+@\S+$/.test(value) ? null : "Некорректный почтовый адрес",
            confirmPassword: (value, values) =>
                value !== values.password ? "Пароли не совпадают" : null,
        },
    });

    return (
        <Center>
            <Paper w="30%" miw="380" shadow="md" radius="sm" p={30}>
                <Stack gap={20} align="center">
                    <Title>Регистрация</Title>
                    <form
                        onSubmit={form.onSubmit((values: RegistrationData) =>
                            registerUser(values)
                        )}>
                        <TextInput
                            size="md"
                            mb={20}
                            withAsterisk
                            label="Имя"
                            key={form.key("firstName")}
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            size="md"
                            mb={20}
                            withAsterisk
                            label="Фамилия"
                            key={form.key("lastName")}
                            {...form.getInputProps("lastName")}
                        />
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
                            mb={20}
                            withAsterisk
                            label="Пароль"
                            key={form.key("password")}
                            {...form.getInputProps("password")}
                        />
                        <TextInput
                            type="password"
                            size="md"
                            mb={20}
                            withAsterisk
                            label="Повторите пароль"
                            key={form.key("confirmPassword")}
                            {...form.getInputProps("confirmPassword")}
                        />
                        <Anchor href="/login" mb={20}>
                            Уже есть аккаунт
                        </Anchor>
                        {message && (
                            <Alert mt={30} variant="error">
                                {message}
                            </Alert>
                        )}
                        <Center mt={20}>
                            <Button size="md" type="submit">
                                Зарегистрироваться
                            </Button>
                        </Center>
                    </form>
                </Stack>
            </Paper>
        </Center>
    );
}
