import { Alert, Button, Stack, Textarea } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { OrderDraftResponse } from "../../client";
import useAiDraft from "./useAiDraft.tsx";

type Props = {
    onDraft: (draft: OrderDraftResponse) => void;
};

const AiDraftInput = ({ onDraft }: Props) => {
    const { text, setText, loading, warnings, submit, maxLength } = useAiDraft(onDraft);

    return (
        <Stack gap="xs">
            <Textarea
                label="Описание заказа своими словами"
                description="Например: Циркониевая коронка на 21 и 22, цвет A2, нужно через 10 дней"
                autosize
                minRows={2}
                maxLength={maxLength}
                value={text}
                onChange={e => setText(e.currentTarget.value)}
            />
            <Button
                type="button"
                variant="light"
                leftSection={<IconSparkles size={18} />}
                loading={loading}
                disabled={!text.trim()}
                onClick={submit}
                w="fit-content"
            >
                Заполнить с помощью ИИ
            </Button>
            {warnings.length > 0 && (
                <Alert color="yellow" title="Проверьте черновик">
                    {warnings.map(w => <div key={w}>{w}</div>)}
                </Alert>
            )}
        </Stack>
    );
};

export default AiDraftInput;
