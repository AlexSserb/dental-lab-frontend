import { Center, Image, Stack, Text } from "@mantine/core";

type Props = {
    src: string;
    alt: string;
    capture: string;
}

const ManualImage = ({ src, alt, capture }: Props) => {

    return (
        <Stack gap={5}>
            <Image
                src={src}
                alt={alt}
                w={"100%"}
            />
            <Center>
                <Text>{capture}</Text>
            </Center>
        </Stack>
    );
};

export default ManualImage;
