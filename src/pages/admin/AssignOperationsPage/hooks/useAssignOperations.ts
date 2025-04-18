import { useEffect, useState } from "react";
import { OperationForProduct, ProductsService } from "../../../../client";
import { useOrdersContext } from "../../../../contexts/OrdersContext/OrdersContext.tsx";

export function useAssignOperations() {
    const { selectedOrder } = useOrdersContext();
    let [operationsToAssign, setOperationsToAssign] = useState<OperationForProduct[]>([]);

    const processOperation = (operation: OperationForProduct): OperationForProduct => {
        if (!operation.execStart) {
            return operation;
        }
        return {
            ...operation,
            execStart: operation.execStart,
        };
    };

    const getProductsWithOperations = () => {
        if (!selectedOrder) return;
        operationsToAssign = [];
        ProductsService.getWithOperations({
            orderId: selectedOrder?.id,
        })
            .then(products => {
                const operations: OperationForProduct[] = [];
                products.forEach(product =>
                    operations.push(
                        ...product.operations.map(operation =>
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
        getProductsWithOperations();
    }, []);

    return { operationsToAssign, getProductsWithOperations };
}
