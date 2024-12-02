import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { jwtDecode } from "jwt-decode";
import { RegistrationData } from "../types/RegistrationData";
import { RegistrationError } from "../types/RegistrationError";
import { postRegistrationData } from "../api/registrationApi";
import { CustomerOption } from "types/CustomerTypes/CustomerOption";
import customerService from "services/CustomerService";

function useRegistration() {
    const { setAuthTokens, setUser, user } = useUserContext();
    const [message, setMessage] = useState<string>("");
    const [customers, setCustomers] = useState<CustomerOption[]>([]);

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
        customerService.getAll().then(res => {
            const customers: CustomerOption[] = res.data.map(customer => {
                return { value: customer.id, label: customer.name };
            });
            setCustomers(customers);
        });
    }, []);

    const registerUser = (data: RegistrationData) => {
        setMessage("");
        postRegistrationData(data)
            .then(res => {
                setAuthTokens(res.data);
                setUser(jwtDecode(res.data.access));
                localStorage.setItem("authTokens", JSON.stringify(res.data));
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
