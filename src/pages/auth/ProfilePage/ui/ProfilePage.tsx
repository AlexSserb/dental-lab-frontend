import { Button, Center, Divider, Flex, Group, List, MultiSelect, Stack, Text, TextInput, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconCircleCheck, IconEdit } from "@tabler/icons-react";
import useProfile from "../hooks/useProfile";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { ModalChangePassword } from "modals/ModalChangePassword";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";

export function ProfilePage() {
    const { user, logoutUser } = useUserContext();
    const navigate = useNavigate();

    const {
        saveFirstName,
        saveLastName,
        saveCustomers,
        isFirstNameEdit,
        isLastNameEdit,
        isCustomersEdit,
        customers,
        selectedCustomers,
        setSelectedCustomers,
        userData,
        setUserData,
    } = useProfile();

    const renderFirstName = () => {
        return (
            <Group justify="space-between">
                {isFirstNameEdit ? (
                    <TextInput
                        value={userData.firstName}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                firstName: e.target.value,
                            })
                        }
                    />
                ) : (
                    <Text>Имя: {userData.firstName}</Text>
                )}
                {user?.email === userData.email && (
                    <Button onClick={saveFirstName}>
                        {isFirstNameEdit ? <IconCircleCheck /> : <IconEdit />}
                    </Button>
                )}
            </Group>
        );
    };

    const renderLastName = () => {
        return (
            <Group justify="space-between">
                {isLastNameEdit ? (
                    <TextInput
                        value={userData.lastName}
                        onChange={e =>
                            setUserData({
                                ...userData,
                                lastName: e.target.value,
                            })
                        }
                    />
                ) : (
                    <Text>Фамилия: {userData.lastName}</Text>
                )}
                {user?.email === userData.email && (
                    <Button onClick={saveLastName}>
                        {isLastNameEdit ? <IconCircleCheck /> : <IconEdit />}
                    </Button>
                )}
            </Group>
        );
    };

    const handleClickLogoutUser = () => {
        logoutUser();
        navigate("/login");
    };

    const renderCustomers = () => {
        return (
            <Stack gap="xs">
                <Group justify="space-between">
                    {userData.customers.length > 0 ? (
                        <Text>Прикрепленные заказчики:</Text>
                    ) : (
                        <Text>Нет прикрепленных заказчиков</Text>
                    )}

                    {user?.email === userData.email && (
                        <Button onClick={saveCustomers}>
                            {isCustomersEdit ? (
                                <IconCircleCheck />
                            ) : (
                                <IconEdit />
                            )}
                        </Button>
                    )}
                </Group>

                {isCustomersEdit ? (
                    <MultiSelect
                        data={customers}
                        value={selectedCustomers}
                        onChange={setSelectedCustomers}
                    />
                ) : (
                    <List spacing="xs">
                        {userData.customers.map(customer => (
                            <List.Item key={customer.id}>
                                {customer.name}
                            </List.Item>
                        ))}
                    </List>
                )}
            </Stack>
        );
    };

    return <Center>
        <RoundedBoxContainer width="33%" minWidth="380px">
            <Stack gap={20} p="md">
                <Center mb={20}>
                    <Title>Профиль</Title>
                </Center>

                {renderLastName()}

                {renderFirstName()}

                <Text>Почтовый адрес: {userData.email}</Text>

                <Text>Должность: {userData.group}</Text>

                <Text>Дата регистрации: {userData.createdAt}</Text>

                {userData.group === "Врач" && (
                    <>
                        <Divider />
                        {renderCustomers()}
                        <Divider />
                    </>
                )}

                {user?.email === userData.email ? (
                    <>
                        <ModalChangePassword />
                        <Button
                            variant="contained"
                            onClick={() => handleClickLogoutUser()}>
                            Выйти
                        </Button>
                        <Flex gap={"xs"}>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/about")}
                                flex={1}
                            >
                                О системе
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate("/user-manual")}
                                flex={1}
                            >
                                Руководство пользователя
                            </Button>
                        </Flex>
                    </>
                ) : (
                    userData.group !== "Врач" && (
                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate("/tech-schedule", {
                                    state: { techEmail: userData.email },
                                })
                            }>
                            Расписание
                        </Button>
                    )
                )}
            </Stack>
        </RoundedBoxContainer>
    </Center>;
}
