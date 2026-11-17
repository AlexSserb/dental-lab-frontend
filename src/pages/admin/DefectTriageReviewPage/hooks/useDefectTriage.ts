import { useCallback, useEffect, useRef, useState } from "react";
import { ApiError } from "../../../../client/core/ApiError";
import { DefectsService, TriageDetail } from "../../../../client";
import { showErrorNotification } from "utils/notifications";
import { POLLING_STATES, DefectTriageState } from "utils/defectTriage";

const POLL_INTERVAL_MS = 3000;

function useDefectTriage(triageId: string | undefined) {
    const [triage, setTriage] = useState<TriageDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    const fetchTriage = useCallback(() => {
        if (!triageId) return;
        DefectsService.getDefectTriage({ triageId })
            .then(detail => {
                setTriage(detail);
                setNotFound(false);
            })
            .catch((error: unknown) => {
                if (error instanceof ApiError && error.status === 404) {
                    setNotFound(true);
                    return;
                }
                showErrorNotification("Не удалось загрузить разбор дефекта.");
            });
    }, [triageId]);

    useEffect(() => {
        setIsLoading(true);
        fetchTriage();
    }, [fetchTriage]);

    // While the worker is driving the triage (submitted / processing / decided) the state changes on its
    // own — poll so the admin sees the proposal appear (and the result after a decision) without refreshing.
    const state = triage?.state;
    const shouldPoll = !!state && POLLING_STATES.includes(state as DefectTriageState);
    useEffect(() => {
        if (!shouldPoll) return;
        timerRef.current = setTimeout(() => {
            if (document.visibilityState === "visible") fetchTriage();
        }, POLL_INTERVAL_MS);
        return () => clearTimeout(timerRef.current);
    }, [shouldPoll, fetchTriage, state]);

    return { triage, isLoading, notFound, refresh: fetchTriage, isPolling: shouldPoll };
}

export default useDefectTriage;
