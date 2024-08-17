import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUserContext } from "contexts/UserContext/useUserContext";
import customerService from "services/CustomerService";
import profileService from "services/ProfileService";
import { CustomerOption } from "types/CustomerTypes/CustomerOption";
import { ProfileData } from "../types/ProfileData";

function useProfile() {
    const { user } = useUserContext();
    const [userData, setUserData] = useState<ProfileData>({
        email: "",
        firstName: "",
        lastName: "",
        group: "",
        createdAt: "",
        customers: [],
    });
    const [isFirstNameEdit, setIsFirstNameEdit] = useState(false);
    const [isLastNameEdit, setIsLastNameEdit] = useState(false);
    const [isCustomersEdit, setIsCustomersEdit] = useState(false);
    const [customers, setCustomers] = useState<CustomerOption[]>([]);
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

    const { state } = useLocation();

    const formatAndSetUserData = (data: ProfileData) => {
        setUserData({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            group: data.group,
            createdAt: data.createdAt,
            customers: data.customers,
        });

        setSelectedCustomers(data.customers.map(customer => customer.id));
    };

    useEffect(() => {
        profileService
            .getProfileData(state?.email)
            .then(res => formatAndSetUserData(res.data))
            .catch(err => {
                console.log(err);
            });

        customerService.getAll().then(res => {
            const customers: CustomerOption[] = res.data.map(customer => {
                return { value: customer.id, label: customer.name };
            });
            setCustomers(customers);
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
            profileService
                .patchUserFirstName(user.email, userData.firstName)
                .then(res => {
                    formatAndSetUserData(res.data);
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
            profileService
                .patchUserLastName(user.email, userData.lastName)
                .then(res => {
                    formatAndSetUserData(res.data);
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
            profileService
                .attachCustomers(selectedCustomers)
                .then(res => {
                    formatAndSetUserData(res.data);
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
