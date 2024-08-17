import {
    Alert,
    Anchor,
    Button,
    Center,
    MultiSelect,
    Paper,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { RegistrationData } from "../types/RegistrationData";
import useRegistration from "../hooks/useRegistration";

export function RegistrationPage() {
    const { message, registerUser, customers } = useRegistration();

    const form = useForm<RegistrationData>({
        mode: "uncontrolled",
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            customers: [],
        },

        validate: {
            email: value =>
                /^\S+@\S+$/.test(value) ? null : "Некорректный почтовый адрес",
            confirmPassword: (value, values) =>
                value !== values.password ? "Пароли не совпадают" : null,
        },
    });

    const inputStyle = {
        size: "md",
        mb: 20,
    };

    return (
        <Center>
            <Paper w="40%" miw="380" shadow="md" radius="sm" px={35} py={20}>
                <Stack w="100%" gap={20} align="center">
                    <Title>Регистрация</Title>
                    <form
                        style={{ width: "100%" }}
                        onSubmit={form.onSubmit((values: RegistrationData) =>
                            registerUser(values)
                        )}>
                        <TextInput
                            {...inputStyle}
                            withAsterisk
                            label="Имя"
                            key={form.key("firstName")}
                            {...form.getInputProps("firstName")}
                        />
                        <TextInput
                            {...inputStyle}
                            withAsterisk
                            label="Фамилия"
                            key={form.key("lastName")}
                            {...form.getInputProps("lastName")}
                        />
                        <TextInput
                            {...inputStyle}
                            withAsterisk
                            label="Почта"
                            placeholder="your@email.com"
                            key={form.key("email")}
                            {...form.getInputProps("email")}
                        />
                        <TextInput
                            type="password"
                            {...inputStyle}
                            withAsterisk
                            label="Пароль"
                            key={form.key("password")}
                            {...form.getInputProps("password")}
                        />
                        <TextInput
                            type="password"
                            {...inputStyle}
                            withAsterisk
                            label="Повторите пароль"
                            key={form.key("confirmPassword")}
                            {...form.getInputProps("confirmPassword")}
                        />
                        <MultiSelect
                            data={customers}
                            key={form.key("customers")}
                            {...form.getInputProps("customers")}
                            label="Прикрепите организации"
                            {...inputStyle}
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
