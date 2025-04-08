import { ReactNode } from "react";
import { Button, ButtonProps, Group } from "@mantine/core";

interface Props extends ButtonProps {
    children?: ReactNode;
    onClick?: () => void;
}

const InlineButton = ({ children, onClick, ...props }: Props) => {
    return (
        <Button
            onClick={onClick}
            {...props}
        >
            <Group gap="sm" wrap={"nowrap"}>
                {children}
            </Group>
        </Button>
    );
};

export default InlineButton;
