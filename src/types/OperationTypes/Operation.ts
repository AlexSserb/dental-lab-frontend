import { User } from "types/User";
import OperationStatus from "./OperationStatus";
import OperationType from "./OperationType";
import Product from "../ProductTypes/Product.ts";

type Operation = {
    id: string;
    operationType: OperationType;
    operationStatus?: OperationStatus;
    tech?: User;
    createdAt?: Date;
    execStart: Date | null;
    ordinalNumber: number;
};

export default Operation;

export type OperationOption = {
    value: string;
    label: string;
}

export type OperationHistory = {
    pghCreatedAt: string;
    operationStatus: OperationStatus;
};

export type OperationAndProduct = Operation & {
    product: Product;
}

export type FullOperation = Operation & {
    history: OperationHistory[];
};
