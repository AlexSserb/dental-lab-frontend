import { Center, Divider, Paper, Stack, Text, Title } from "@mantine/core";

export function AboutPage() {
    return (
        <Center>
            <Paper w="30%" miw="380" shadow="md" radius="sm" px={50} py={30}>
                <Stack gap={20}>
                    <Center>
                        <Title order={3}>
                            О системе
                        </Title>
                    </Center>
                    <Divider />
                    <Text>
                        Разработал студент Астраханского Государственного Технического Университета - Сербин А.А.
                    </Text>
                    <Divider />
                    <Text>
                        Связаться с администратором:<br />
                        Почта: {import.meta.env.VITE_LAB_ADMIN_EMAIL}<br />
                        Номер: {import.meta.env.VITE_LAB_ADMIN_NUMBER}
                    </Text>
                    <Text>
                        Связаться с разработчиком:<br />
                        Почта: {import.meta.env.VITE_SYS_DEV_EMAIL}
                    </Text>
                </Stack>
            </Paper>
        </Center>
    );
}
