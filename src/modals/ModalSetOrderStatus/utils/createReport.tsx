import { Button, Group } from "@mantine/core";
import { Order } from "../../../types/OrderTypes/Order.ts";
import { IconFileTypePdf } from "@tabler/icons-react";

const createReport = (order: Order | null, statusNumber: number, text: string, loader: () => void) => {
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