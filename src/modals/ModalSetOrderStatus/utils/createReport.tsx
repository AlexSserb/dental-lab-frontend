import { IconFileTypePdf } from "@tabler/icons-react";
import { OrderWithPhysician } from "../../../client";
import InlineButton from "../../../components/InlineButton/InlineButton.tsx";

const createReport = (
    order: OrderWithPhysician | null,
    statusNumber: number,
    text: string,
    loader: () => void,
) => {
    if (order && order?.status?.number >= statusNumber) {
        return (
            <InlineButton
                variant={"default"}
                onClick={() => loader()}
                w={"100%"}
            >
                <IconFileTypePdf />
                {text}
            </InlineButton>
        );
    }
};

export default createReport;