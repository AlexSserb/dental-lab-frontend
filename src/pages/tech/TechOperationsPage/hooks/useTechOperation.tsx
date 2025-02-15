import { useEffect, useState } from "react";
import { Operation, OperationsService } from "../../../../client";
import { Option } from "../../../../types/Option.ts";

function useTechOperation() {
    const [operations, setOperations] = useState<Operation[]>([]);
    const [operationStatuses, setOperationStatuses] = useState<Option[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadOperations = (page: number) => {
        OperationsService.getForTech({ page })
            .then(res => {
                setOperations(res.results);
                setTotalPages(res.totalPages);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        OperationsService.getOperationStatuses()
            .then(operationStatuses => {
                const operations = operationStatuses.map(oper => {
                    return { value: oper.id, label: oper.name };
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
