import {
    AppShell,
    Burger,
    Group,
    Title,
    UnstyledButton,
    Text,
} from "@mantine/core";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import PageInfo from "types/PageInfo";

type HeaderProps = {
    opened: boolean;
    toggle: () => void;
    pages: PageInfo[];
};

export function Header(props: HeaderProps) {
    const { user } = useUserContext();
    const { opened, toggle, pages } = props;
    const navigate = useNavigate();

    const getMenu = () => {
        return pages.map(({ title, path, state }: PageInfo) => (
            <UnstyledButton
                key={path}
                onClick={() => navigate(path, { state: state })}>
                <Text size="lg">{title}</Text>
            </UnstyledButton>
        ));
    };

    return (
        <AppShell.Header>
            <Group h="100%" px="md">
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
                <Group
                    justify="space-between"
                    style={{ flex: 1, marginLeft: 10 }}>
                    <Title order={1}>InColor</Title>
                    <Group mx="xl" gap={20} visibleFrom="sm">
                        {user ? (
                            getMenu()
                        ) : (
                            <UnstyledButton
                                onClick={() => navigate("/login")}
                                key="/login">
                                <Text size="lg">Войти</Text>
                            </UnstyledButton>
                        )}
                    </Group>
                </Group>
            </Group>
        </AppShell.Header>
    );
}
