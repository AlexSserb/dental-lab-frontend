import { Tooltip } from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";

type Props = {
    message: string | ReactNode;
}

const Help = ({ message }: Props) => {
    if (isMobile) return;
    return (
        <Tooltip bg={"gray"} label={message}>
            <IconHelp size={20} color={"#616160"} />
        </Tooltip>
    );
};

export default Help;
