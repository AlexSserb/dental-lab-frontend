import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FullOperation, OperationsService } from "../../../../client";

export function useAdminOperations() {
    const [operations, setOperations] = useState<FullOperation[]>([]);
    const { state } = useLocation();
    const { product } = state;

    const getOperations = () => {
        OperationsService.getForProduct({
            productId: product.id,
        })
            .then(operations => {
                setOperations(operations);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getOperations();
    }, []);

    return { operations, product };
}
