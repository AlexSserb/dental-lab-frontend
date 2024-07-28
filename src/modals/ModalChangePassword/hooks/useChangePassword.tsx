import { postChangePassword } from "../api/changePasswordApi";
import { ChangePasswordData } from "../types/ChangePasswordData";
import { notifications } from "@mantine/notifications";

interface ChangePasswordProps {
    handleCloseModal: () => void;
}

function useChangePassword({ handleCloseModal }: ChangePasswordProps) {
    const showNotification = (title: string, message: string) => {
        notifications.show({
            title: title,
            message: message,
        });
    };

    const submitChanges = (data: ChangePasswordData) => {
        if (data.newPassword.length < 8) {
            showNotification(
                "Error",
                "Пароль должен состоять не менее чем из 8-ми символов."
            );
            return;
        }

        if (data.newPassword !== data.confirmPassword) {
            showNotification(
                "Error",
                "Новый пароль не совпадает с повтором пароля."
            );
            return;
        }

        postChangePassword(data.oldPassword, data.newPassword)
            .then(_ => {
                handleCloseModal();
            })
            .catch(err => {
                console.log(err);
                if (err?.response?.data?.oldPassword[0] === "Wrong password") {
                    showNotification("Error", "Неправильный старый пароль.");
                } else {
                    showNotification("Error", "Ошибка смены пароля.");
                }
            });
    };

    return { submitChanges };
}

export default useChangePassword;
