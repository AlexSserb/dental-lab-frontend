import React, { createContext, FC, useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { OperationForSchedule, OperationsService } from "../../../client";

type OperationEditContextState = {
    opened: boolean;
    open: () => void;
    close: () => void;
    updateOperation: (operation: OperationForSchedule, refetchOperations: () => void, resourceId?: string) => void;
    operation: OperationForSchedule | null;
    setOperation: React.Dispatch<React.SetStateAction<OperationForSchedule | null>>
};

const OperationEditContext = createContext<OperationEditContextState | undefined>(
    undefined,
);

const useOperationEditContextState = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [operation, setOperation] = useState<OperationForSchedule | null>(null);

    const updateOperation = (
        operation: OperationForSchedule,
        refetchOperations: () => void,
        resourceId?: string,
    ) => {
        const dateStart = new Date(operation.start);
        OperationsService.updateOperation({
            requestBody: {
                operationId: operation.id,
                execStart: dateStart.toUTCString(),
                techEmail: resourceId,
                editable: operation.editable,
            },
        })
            .then(() => refetchOperations())
            .catch(err => console.log(err));
    };

    return {
        opened,
        open,
        close,
        updateOperation,
        operation,
        setOperation,
    };
};

type OperationEditContextProviderProps = {
    children: React.ReactNode;
};

export const OperationEditContextProvider: FC<OperationEditContextProviderProps> = ({ children }) => {
    const state = useOperationEditContextState();

    return (
        <OperationEditContext.Provider value={state}>
            {children}
        </OperationEditContext.Provider>
    );
};

export const useOperationEditContext = () => {
    const context = useContext(OperationEditContext);
    if (!context) {
        throw new Error(
            "useOperationEditContext must be used within a OperationEditContextProvider",
        );
    }
    return context;
};
