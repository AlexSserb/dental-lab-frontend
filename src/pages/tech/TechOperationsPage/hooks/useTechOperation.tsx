import { useEffect, useState } from "react";
import operationService from "services/OperationService";
import { OperationOption } from "../types/OperationOption";
import Operation from "types/OperationTypes/Operation";

function useTechOperation() {
    const [operations, setOperations] = useState<Operation[]>([]);
    const [operationStatuses, setOperationStatuses] = useState<
        OperationOption[]
    >([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadOperations = (page: number) => {
        operationService
            .getForTech(page)
            .then(res => {
                setOperations(res.data.results);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        operationService
            .getOperationStatuses()
            .then(res => {
                let operations = res.data.map(oper => {
                    return { key: oper.id, value: oper.name };
                });
                setOperationStatuses(operations);
            })
            .catch(err => console.log(err));

        loadOperations(page);
    }, []);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
        loadOperations(newPage);
    };

    return {
        operations,
        totalPages,
        page,
        handleChangePage,
        operationStatuses,
        loadOperations,
    };
}

export default useTechOperation;
