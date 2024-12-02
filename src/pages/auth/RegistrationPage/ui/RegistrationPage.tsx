import { Center, rem, Stepper } from "@mantine/core";
import RegistrationStep from "../components/RegistrationStep.tsx";
import { IconCircleCheck, IconDental, IconMailOpened, IconUserCheck } from "@tabler/icons-react";
import useRegistration from "../hooks/useRegistration.tsx";
import EmailVerificationStep from "../components/EmailVerificationStep.tsx";
import FinishStep from "../components/FinishStep.tsx";

export function RegistrationPage() {
    const {
        stepperActive,
        setStepperActive,
    } = useRegistration();

    const stepperIconStyle = {
        width: rem(18),
        height: rem(18)
    };

    return (
        <Center>
            <Stepper
                active={stepperActive}
                onStepClick={setStepperActive}
                // allowNextStepsSelect={false}
                completedIcon={<IconCircleCheck style={stepperIconStyle} />}
                style={{ gap: 20 }}
            >
                <Stepper.Step
                    label="Шаг 1"
                    description="Создание аккаунта"
                    icon={<IconUserCheck style={stepperIconStyle} />}
                >
                    <RegistrationStep />
                </Stepper.Step>
                <Stepper.Step
                    label="Шаг 2"
                    description="Верификация почты"
                    icon={<IconMailOpened style={stepperIconStyle} />}
                >
                    <EmailVerificationStep />
                </Stepper.Step>
                <Stepper.Step
                    label="Шаг 3"
                    description="Перейти к оформлению заказа"
                    icon={<IconDental style={{ width: rem(18), height: rem(18) }} />}
                >
                    <FinishStep />
                </Stepper.Step>
            </Stepper>
        </Center>
    );
}
