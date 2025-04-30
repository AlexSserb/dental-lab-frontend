import { useEffect, useState } from "react";
import { OperationForWork, WorksService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

export function useAssignOperations() {
    const { selectedOrder } = useOrdersContext();
    let [operationsToAssign, setOperationsToAssign] = useState<OperationForWork[]>([]);

    const processOperation = (operation: OperationForWork): OperationForWork => {
        if (!operation.execStart) {
            return operation;
        }
        return {
            ...operation,
            execStart: operation.execStart,
        };
    };

    const getWorksWithOperations = () => {
        if (!selectedOrder) return;
        operationsToAssign = [];
        WorksService.getWithOperations({
            orderId: selectedOrder?.id,
        })
            .then(works => {
                const operations: OperationForWork[] = [];
                works.forEach(work =>
                    operations.push(
                        ...work.operations.map(operation =>
                            processOperation(operation),
                        ),
                    ),
                );
                setOperationsToAssign(operations);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getWorksWithOperations();
    }, []);

    return { operationsToAssign, getWorksWithOperations, selectedOrder };
}
