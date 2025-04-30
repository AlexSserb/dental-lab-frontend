import { OrderWithPhysician, WorkAndOperations } from "../../../../client";

export const getWorkCost = (work: WorkAndOperations, order: OrderWithPhysician | null) => {
    if (!order) return 0;

    const cost = work.workType.cost ?? 0;
    const discount = Math.max(work.discount ?? 0, order?.discount ?? 0);
    return cost * work.amount * (1 - discount / 100);
};

export const getOrderCost = (works: WorkAndOperations[], order: OrderWithPhysician | null) => {
    if (!order) return 0;

    return works.reduce(
        (partialSum, work) => partialSum + getWorkCost(work, order),
        0
    );
};
