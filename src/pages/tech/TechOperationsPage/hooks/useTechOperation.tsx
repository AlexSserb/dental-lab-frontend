import { useEffect, useState } from "react";
import operationService from "services/OperationService";
import { OperationAndProduct, OperationOption } from "types/OperationTypes/Operation";

function useTechOperation() {
    const [operations, setOperations] = useState<OperationAndProduct[]>([]);
    const [operationStatuses, setOperationStatuses] = useState<
        OperationOption[]
    >([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const loadOperations = (page: number) => {
        operationService
            .getForTech(page)
            .then(res => {
                console.log(res.data)
                setOperations(res.data.results);
                setTotalPages(res.data.totalPages);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        operationService
            .getOperationStatuses()
            .then(res => {
                const operations = res.data.map(oper => {
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
