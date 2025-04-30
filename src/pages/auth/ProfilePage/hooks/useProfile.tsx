import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUserContext } from "contexts/UserContext/useUserContext";
import { AccountsService, UserProfile } from "../../../../client";
import { Option } from "../../../../types/Option.ts";

function useProfile() {
    const { user } = useUserContext();
    const [userData, setUserData] = useState<UserProfile>({
        email: "",
        firstName: "",
        lastName: "",
        group: "",
        createdAt: "",
        customers: [],
        groupId: 1,
    });
    const [isFirstNameEdit, setIsFirstNameEdit] = useState(false);
    const [isLastNameEdit, setIsLastNameEdit] = useState(false);
    const [isCustomersEdit, setIsCustomersEdit] = useState(false);
    const [customers, setCustomers] = useState<Option[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

    const { state } = useLocation();

    const formatAndSetUserData = (data: UserProfile) => {
        setUserData(data);

        setSelectedCustomers(data.customers.map(customer => customer.id));
    };

    useEffect(() => {
        AccountsService.getProfileData({
            email: state.email,
        })
            .then(profileData => formatAndSetUserData(profileData))
            .catch(err => console.log(err));

        AccountsService.getCustomers()
            .then(customers => {
                const customerOptions: Option[] = customers.map(customer => {
                    return { value: customer.id, label: customer.name };
                });
                setCustomers(customerOptions);
            });
    }, [state?.email]);

    const showErrorNotification = () => {
        notifications.show({
            title: "Error",
            message: "Ошибка. Редактирование профиля не доступно.",
        });
    };

    const saveFirstName = () => {
        if (isFirstNameEdit && user) {
            AccountsService.editFirstName({
                email: user.email,
                name: userData.firstName,
            })
                .then(profileData => {
                    formatAndSetUserData(profileData);
                    notifications.show({
                        title: "Success",
                        message: "Имя успешно изменено.",
                    });
                    setIsFirstNameEdit(false);
                })
                .catch(err => {
                    showErrorNotification();
                    console.log(err);
                });
        } else {
            setIsFirstNameEdit(true);
        }
    };

    const saveLastName = () => {
        if (isLastNameEdit && user) {
            AccountsService.editLastName({
                email: user.email,
                name: userData.lastName,
            })
                .then(profileData => {
                    formatAndSetUserData(profileData);
                    notifications.show({
                        title: "Success",
                        message: "Фамилия успешно изменена.",
                    });
                    setIsLastNameEdit(false);
                })
                .catch(err => {
                    showErrorNotification();
                    console.log(err);
                });
        } else {
            setIsLastNameEdit(true);
        }
    };

    const saveCustomers = () => {
        if (isCustomersEdit && user) {
            AccountsService.attachCustomersToUser({
                requestBody: {
                    customers: selectedCustomers,
                },
            })
                .then(profile => {
                    formatAndSetUserData(profile);
                    notifications.show({
                        title: "Success",
                        message: "Заказчики успешно прикреплены.",
                    });
                    setIsCustomersEdit(false);
                })
                .catch(err => {
                    showErrorNotification();
                    console.log(err);
                });
        } else {
            setIsCustomersEdit(true);
        }
    };

    return {
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
    };
}

export default useProfile;
