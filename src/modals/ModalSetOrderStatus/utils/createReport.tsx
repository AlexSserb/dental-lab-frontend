import { Button } from "@mantine/core";
import { Order } from "../../../types/OrderTypes/Order.ts";

const createReport = (order: Order | null, statusNumber: number, text: string, loader: () => void) => {
    if (order && order?.status?.number >= statusNumber) {
        return (
            <Button
                variant="contained"
                onClick={() => loader()}>
                {text}
            </Button>
        );
    }
};

export default createReport;