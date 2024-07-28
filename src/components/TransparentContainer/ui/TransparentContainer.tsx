import { Flex, Group } from "@mantine/core";
import { ReactNode } from "react";

type TransparentContainerProps = {
    children?: ReactNode;
};

export function TransparentContainer({ children }: TransparentContainerProps) {
    return (
        <Flex justify="center">
            <Group align="start">{children}</Group>
        </Flex>
    );
}
