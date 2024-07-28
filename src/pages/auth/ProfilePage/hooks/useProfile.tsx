import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUserContext } from "contexts/UserContext/useUserContext";
import { ProfileData } from "../types/ProfileData";
import profileService from "services/ProfileService";

function useProfile() {
    const { user } = useUserContext();
    const [userData, setUserData] = useState<ProfileData>({
        email: "",
        firstName: "",
        lastName: "",
        group: "",
        createdAt: "",
    });
    const [isFirstNameEdit, setIsFirstNameEdit] = useState(false);
    const [isLastNameEdit, setIsLastNameEdit] = useState(false);

    const { state } = useLocation();

    const formatAndSetUserData = (data: ProfileData) => {
        setUserData({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            group: data.group,
            createdAt: data.createdAt,
        });
    };

    useEffect(() => {
        profileService
            .getProfileData(state?.email)
            .then(res => formatAndSetUserData(res.data))
            .catch(err => {
                console.log(err);
            });
    }, []);

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

    return {
        saveFirstName,
        saveLastName,
        isFirstNameEdit,
        setIsFirstNameEdit,
        isLastNameEdit,
        setIsLastNameEdit,
        userData,
        setUserData,
    };
}

export default useProfile;
