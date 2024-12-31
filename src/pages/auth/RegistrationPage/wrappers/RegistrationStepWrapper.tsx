import { ReactNode } from "react";
import { Center, em, Paper } from "@mantine/core";

type Props = {
    children: ReactNode;
}

const RegistrationStepWrapper = ({ children }: Props) => {
    return (
        <Center>
            <Paper
                w="100%"
                miw="380"
                shadow="md"
                radius="sm"
                px={em(40)}
                py={em(20)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: em(40),
                }}
            >
                {children}
            </Paper>
        </Center>
    );
};

export default RegistrationStepWrapper;
