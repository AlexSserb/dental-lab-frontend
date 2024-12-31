import { Button, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconDental } from "@tabler/icons-react";
import RegistrationStepWrapper from "../wrappers/RegistrationStepWrapper.tsx";

const FinishStep = () => {
    const navigate = useNavigate();

    return (
        <RegistrationStepWrapper>
            <Title order={2}>
                Вы успешно зарегистрированы
            </Title>
            <Button onClick={() => navigate("/")}>
                <IconDental />
                <div>Перейти к оформлению первого заказа</div>
            </Button>
        </RegistrationStepWrapper>
    );
};

export default FinishStep;
