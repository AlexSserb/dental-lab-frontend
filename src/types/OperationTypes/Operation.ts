import { User } from "types/User";
import OperationStatus from "./OperationStatus";
import OperationType from "./OperationType";

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

export type OperationHistory = {
    pghCreatedAt: string;
    operationStatus: OperationStatus;
};

export type FullOperation = Operation & {
    history: OperationHistory[];
};
