import { Button, Group } from "@mantine/core";
import { IconFileTypePdf } from "@tabler/icons-react";
import { OrderWithPhysician } from "../../../client";

const createReport = (
    order: OrderWithPhysician | null,
    statusNumber: number,
    text: string,
    loader: () => void,
) => {
    if (order && order?.status?.number >= statusNumber) {
        return (
            <Button
                variant="outline"
                onClick={() => loader()}
            >
                <Group gap="sm">
                    <IconFileTypePdf />
                    {text}
                </Group>
            </Button>
        );
    }
};

export default createReport;