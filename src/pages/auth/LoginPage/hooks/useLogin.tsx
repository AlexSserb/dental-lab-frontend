import { useState } from "react";
import { LoginData } from "../types/LoginData";
import { AxiosError } from "axios";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { postLoginData } from "../api/loginApi";

function useLogin() {
    const { setAuthTokens, setUser } = useUserContext();
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const loginUser = (data: LoginData) => {
        setMessage("");
        postLoginData(data)
            .then(res => {
                setAuthTokens(res.data);
                setUser(jwtDecode(res.data.access));
                localStorage.setItem("authTokens", JSON.stringify(res.data));
                navigate("/");
            })
            .catch((err: AxiosError) => {
                console.log(err);
                if (!err.response) {
                    setMessage("Ошибка. Не удалось подключиться к серверу.");
                } else if (err.response.status === 401) {
                    setMessage("Неверный почтовый адрес или пароль.");
                } else {
                    setMessage("Ошибка входа в систему.");
                }
            });
    };

    return { message, loginUser };
}

export default useLogin;
