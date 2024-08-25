import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import productService from "services/ProductService";
import Operation from "types/OperationTypes/Operation";

export function useAssignOperations() {
    const { state } = useLocation();
    let [operationsToAssign, setOperationsToAssign] = useState<Operation[]>([]);

    const processOperation = (operation: any): Operation => {
        if (!operation.execStart) {
            return operation;
        }
        return {
            ...operation,
            execStart: new Date(operation.execStart),
        };
    };

    const getProductsWithOperations = () => {
        operationsToAssign = [];
        productService
            .getWithOperationsForOrder(state.order.id)
            .then(res => {
                const operations: Operation[] = [];
                res.data.forEach(product =>
                    operations.push(
                        ...product.operations.map(operation =>
                            processOperation(operation)
                        )
                    )
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
