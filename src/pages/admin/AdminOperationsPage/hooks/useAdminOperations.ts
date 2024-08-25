import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import operationService from "services/OperationService";
import { FullOperation } from "types/OperationTypes/Operation";

export function useAdminOperations() {
    const [operations, setOperations] = useState<FullOperation[]>([]);
    const { state } = useLocation();
    const { product } = state;

    const getOperations = () => {
        operationService
            .getForProduct(product.id)
            .then(res => {
                setOperations(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getOperations();
    }, []);

    return { operations, product };
}
