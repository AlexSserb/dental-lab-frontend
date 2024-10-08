import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { RegistrationData } from "../types/RegistrationData";
import { RegistrationError } from "../types/RegistrationError";
import { postRegistrationData } from "../api/registrationApi";
import { CustomerOption } from "types/CustomerTypes/CustomerOption";
import customerService from "services/CustomerService";

function useRegistration() {
    const { setAuthTokens, setUser } = useUserContext();
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerOption[]>([]);

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
                navigate("/");
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
    };
}

export default useRegistration;
