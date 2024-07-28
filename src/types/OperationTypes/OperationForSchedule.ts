import OperationStatus from "types/OperationTypes/OperationStatus";
import OperationType from "types/OperationTypes/OperationType";
import Product from "types/ProductTypes/Product";

export type OperationForSchedule = {
    id: string;
    start: Date;
    end: Date;
    operationType: OperationType;
    operationStatus: OperationStatus;
    product: Product;
};
