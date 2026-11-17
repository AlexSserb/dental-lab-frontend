import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMantineReactTable } from "mantine-react-table";
import { MRT_Localization_RU } from "mantine-react-table/locales/ru/index.cjs";
import { DefectsService, TriageListItem } from "../../../../client";
import { showErrorNotification } from "utils/notifications";
import TableRow from "../types/TableRow";
import columns from "../utils/columns";

function useDefectTriageList() {
    const [triages, setTriages] = useState<TriageListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTriages = useCallback(() => {
        setIsLoading(true);
        DefectsService.listDefectTriages()
            .then(setTriages)
            .catch(() => showErrorNotification("Не удалось загрузить разборы дефектов."))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(fetchTriages, [fetchTriages]);

    const data = useMemo(
        () =>
            triages.map((triage): TableRow => ({
                id: triage.id,
                createdAt: new Date(triage.createdAt).toLocaleString("ru-RU"),
                orderId: triage.orderId,
                comment: triage.comment,
                state: triage.state,
                revisions: triage.revisions,
                decision: triage.decision,
            })),
        [triages],
    );

    const openTriage = (id: string) => {
        navigate(`/defect-triage/${id}`);
    };

    const table = useMantineReactTable({
        columns,
        data,
        enableFullScreenToggle: false,
        enableGrouping: false,
        enableRowActions: true,
        positionActionsColumn: "last",
        paginationDisplayMode: "pages",
        positionToolbarAlertBanner: "bottom",
        state: { isLoading },
        mantinePaginationProps: { radius: "xl", size: "lg" },
        mantineSearchTextInputProps: { placeholder: "Поиск" },
        localization: MRT_Localization_RU,
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Подробнее",
                size: 30,
            },
        },
        renderRowActions: ({ row }) => (
            <a
                href={`/defect-triage/${row.original.id}`}
                style={{ textDecoration: "none", whiteSpace: "nowrap" }}
                onClick={event => {
                    event.preventDefault();
                    openTriage(row.original.id);
                }}>
                Открыть разбор
            </a>
        ),
        mantineTableBodyRowProps: ({ row }) => ({
            onClick: () => openTriage(row.original.id),
            style: { cursor: "pointer" },
        }),
    });

    return { table, fetchTriages, isEmpty: triages.length === 0 && !isLoading, isLoading };
}

export default useDefectTriageList;
