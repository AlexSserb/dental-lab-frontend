import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { ApiError, OrderDraftResponse, OrdersService } from "../../client";

const MAX_LENGTH = 1000;

const errorMessage = (err: unknown): string => {
    if (err instanceof ApiError) {
        if (err.status === 429) return "Слишком много запросов. Попробуйте позже или заполните форму вручную";
        const detail = (err.body as { detail?: string } | undefined)?.detail;
        if (detail) return detail;
    }
    return "Не удалось получить черновик. Заполните форму вручную";
};

/** Sends free text to the backend and hands the draft to `onDraft`. Nothing is saved on the server. */
const useAiDraft = (onDraft: (draft: OrderDraftResponse) => void) => {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [warnings, setWarnings] = useState<string[]>([]);

    const submit = async () => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        setLoading(true);
        setWarnings([]);
        try {
            const draft = await OrdersService.draftOrderFromText({ requestBody: { text: trimmed } });
            setWarnings(draft.warnings);
            onDraft(draft);
        } catch (err) {
            notifications.show({ title: "Автозаполнение", message: errorMessage(err), color: "red" });
        } finally {
            setLoading(false);
        }
    };

    return { text, setText, loading, warnings, submit, maxLength: MAX_LENGTH };
};

export default useAiDraft;
