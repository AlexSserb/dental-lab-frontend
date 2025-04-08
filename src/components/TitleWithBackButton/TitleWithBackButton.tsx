import { ActionIcon, Button, Divider, Flex, rem, Space, Stack, Title, TitleOrder } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
    backRef: string;
    state?: object;
    titleOrder?: number;
    isMini?: boolean;
}

const TitleWithBackButton = ({ title, backRef, state, titleOrder, isMini = false }: Props) => {
    const navigate = useNavigate();

    return (
        <Stack>
            <Flex
                wrap={"nowrap"}
                justify={"space-between"}
            >
                {isMini ? (
                    <ActionIcon variant={"outline"} color={"black"}>
                        <IconArrowLeft />
                    </ActionIcon>
                ) : (
                    <Button
                        style={{ justifySelf: "flex-start" }}
                        variant={"outline"}
                        color={"black"}
                        onClick={() => {
                            navigate(backRef, { state });
                        }}
                    >
                        <IconArrowLeft />
                    </Button>
                )}
                <Title
                    style={{ justifySelf: "center" }}
                    order={(titleOrder ?? 3) as TitleOrder}
                >
                    {title}
                </Title>
                <Space w={rem(40)} />
            </Flex>
            <Divider />
        </Stack>
    );
};

export default TitleWithBackButton;
