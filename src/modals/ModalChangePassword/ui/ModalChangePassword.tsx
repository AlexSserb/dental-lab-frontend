import { useState } from "react";
import { Button, Modal, PasswordInput, Stack } from "@mantine/core";
import useChangePassword from "../hooks/useChangePassword";
import { useDisclosure } from "@mantine/hooks";

export const ModalChangePassword = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const { submitChanges } = useChangePassword({
        handleCloseModal: close,
    });

    return (
        <Stack>
            <Button variant="contained" onClick={open}>
                Изменить пароль
            </Button>
            <Modal opened={opened} onClose={close} title="Изменение пароля">
                <Stack>
                    <PasswordInput
                        mb={10}
                        label="Старый пароль"
                        value={oldPassword}
                        onChange={event => setOldPassword(event.target.value)}
                    />
                    <PasswordInput
                        mb={10}
                        label="Новый пароль"
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                    />
                    <PasswordInput
                        mb={10}
                        label="Повтор пароля"
                        value={confirmPassword}
                        onChange={event =>
                            setConfirmPassword(event.target.value)
                        }
                    />
                    <Button
                        onClick={() =>
                            submitChanges({
                                oldPassword: oldPassword,
                                newPassword: newPassword,
                                confirmPassword: confirmPassword,
                            })
                        }
                        mb={10}
                        variant="contained">
                        Изменить
                    </Button>
                </Stack>
            </Modal>
        </Stack>
    );
};
