import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { jwtDecode } from "jwt-decode";
import { RegistrationData } from "../types/RegistrationData";
import { RegistrationError } from "../types/RegistrationError";
import { AccountsService } from "../../../../client";
import { Option } from "../../../../types/Option.ts";

function useRegistration() {
    const { setAuthTokens, setUser, user } = useUserContext();
    const [message, setMessage] = useState<string>("");
    const [customers, setCustomers] = useState<Option[]>([]);

    const [stepperActive, setStepperActive] = useState(1);

    useEffect(() => {
        if (user?.isVerified) {
            setStepperActive(2);
        } else if (user) {
            setStepperActive(1);
        } else {
            setStepperActive(0);
        }
    }, [user]);

    useEffect(() => {
        AccountsService.getCustomers()
            .then(customers => {
                const customerOptions: Option[] = customers.map(customer => {
                    return { value: customer.id, label: customer.name };
                });
                setCustomers(customerOptions);
            });
    }, []);

    const registerUser = (data: RegistrationData) => {
        setMessage("");
        AccountsService.register({
            requestBody: data,
        })
            .then(tokens => {
                setAuthTokens(tokens);
                setUser(jwtDecode(tokens.access));
                localStorage.setItem("authTokens", JSON.stringify(tokens));
            })
            .catch((err: AxiosError<RegistrationError>) => {
                console.log(err);
                if (!err.response) {
                    setMessage("Ошибка. Не удалось подключиться к серверу.");
                } else if (err.response?.data?.email) {
                    setMessage(err.response?.data?.email);
                } else {
                    setMessage("Ошибка регистрации.");
                }
            });
    };

    return {
        message,
        registerUser,
        customers,
        stepperActive,
        setStepperActive,
    };
}

export default useRegistration;
