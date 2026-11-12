import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import {
    ApiError,
    CancelablePromise,
    CancelError,
    KnowledgeAskRequest,
    KnowledgeAskResponse,
    KnowledgeService,
} from "../../../../client";

export const MAX_QUESTION_LENGTH = 500;

export type OperationType = NonNullable<KnowledgeAskRequest["operationType"]>;
export const OPERATION_TYPES: OperationType[] = ["Модели", "CAD/CAM", "Керамика", "Протезирование"];

export const EXAMPLE_QUESTIONS = [
    "Что делать, если скол керамики после обжига?",
    "Какой режим синтеризации циркония?",
    "Как избежать пор в акриловом базисе?",
];

const errorMessage = (err: unknown): string => {
    if (err instanceof ApiError) {
        if (err.status === 429) return "Слишком много запросов. Попробуйте позже";
        if (err.status === 403) return "Нет доступа к базе знаний";
        const detail = (err.body as { detail?: string } | undefined)?.detail;
        if (detail) return detail;
    }
    return "Не удалось получить ответ. Попробуйте позже";
};

/** Asks the knowledge base (RAG) and keeps the last answer. A new question cancels the one still in flight. */
const useKnowledgeBase = () => {
    const [question, setQuestion] = useState("");
    const [operationType, setOperationType] = useState<OperationType | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<KnowledgeAskResponse | null>(null);
    const [askedQuestion, setAskedQuestion] = useState("");
    const requestRef = useRef<CancelablePromise<KnowledgeAskResponse> | null>(null);

    useEffect(() => () => requestRef.current?.cancel(), []);

    const ask = async (text: string = question) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        requestRef.current?.cancel();
        const request = KnowledgeService.askKnowledgeBase({ requestBody: { question: trimmed, operationType } });
        requestRef.current = request;

        setQuestion(trimmed);
        setLoading(true);
        setResult(null);
        try {
            const response = await request;
            setAskedQuestion(trimmed);
            setResult(response);
        } catch (err) {
            if (err instanceof CancelError) return; // superseded by a newer question or the page was left
            notifications.show({ title: "База знаний", message: errorMessage(err), color: "red" });
        } finally {
            if (requestRef.current === request) {
                requestRef.current = null;
                setLoading(false);
            }
        }
    };

    return { question, setQuestion, operationType, setOperationType, loading, result, askedQuestion, ask };
};

export default useKnowledgeBase;
