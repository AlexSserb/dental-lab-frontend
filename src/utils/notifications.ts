import { notifications } from "@mantine/notifications";

export const showErrorNotification = (message: string) => {
    notifications.show({
        title: "Error",
        message: message,
    });
};
