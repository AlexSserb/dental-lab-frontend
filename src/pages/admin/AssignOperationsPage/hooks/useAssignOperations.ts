import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { OperationForProduct, ProductsService } from "../../../../client";

export function useAssignOperations() {
    const { state } = useLocation();
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
        operationsToAssign = [];
        ProductsService.getWithOperations({
            orderId: state.order.id,
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
