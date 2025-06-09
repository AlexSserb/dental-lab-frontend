import { Group, rem, Stack, Text, UnstyledButton } from "@mantine/core";
import { Dropzone, DropzoneProps, FileWithPath, MIME_TYPES } from "@mantine/dropzone";
import { IconFile, IconSquareX, IconUpload, IconX } from "@tabler/icons-react";

type Props = {
    dropzoneProps?: DropzoneProps;
    onChange: (files: FileWithPath[]) => void;
    value?: FileWithPath[];
}

const FilesInput = ({ dropzoneProps, onChange, value }: Props) => {
    const onDrop = (droppedFiles: FileWithPath[]) => {
        const filesToAdd: FileWithPath[] = [];
        droppedFiles.forEach(droppedFile => {
            if (value?.findIndex(file => file.path === droppedFile.path) === -1) {
                filesToAdd.push(droppedFile);
            }
        });
        onChange([...filesToAdd, ...value ?? []]);
    };

    const onDelete = (file: FileWithPath) => {
        onChange(value?.filter(f => f.path !== file.path) ?? []);
    };

    return (
        <Stack>
            <Dropzone
                {...dropzoneProps}
                multiple={false}
                onDrop={onDrop}
                maxSize={15_728_640} // 15 MB
                accept={[
                    MIME_TYPES.xlsx,
                    MIME_TYPES.doc,
                    MIME_TYPES.pdf,
                    MIME_TYPES.jpeg,
                    MIME_TYPES.png,
                    MIME_TYPES.docx,
                    MIME_TYPES.gif,
                    MIME_TYPES.mp4,
                    MIME_TYPES.svg,
                    MIME_TYPES.zip,
                ]}
            >
                <Group
                    justify="center"
                    gap="xs"
                    style={{ pointerEvents: "none", border: "1px dashed gray", borderRadius: 12, padding: 10 }}
                >
                    <Dropzone.Accept>
                        <IconUpload
                            style={{
                                width: rem(30),
                                height: rem(30),
                                color: "var(--mantine-color-blue-6)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{
                                width: rem(30),
                                height: rem(30),
                                color: "var(--mantine-color-red-6)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconFile
                            style={{
                                width: rem(30),
                                height: rem(30),
                                color: "var(--mantine-color-dimmed)",
                            }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div style={{ textAlign: "center" }}>
                        <Text
                            size="md"
                            inline
                            c={"dark"}
                        >
                            Перенесите или нажмите для добавления файла (макс. размер 15 МБ)
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            {value?.map((file: FileWithPath, index: number) => (
                <Group key={index} justify={"space-between"}>
                    <Group>
                        {file.name}
                    </Group>
                    <UnstyledButton
                        className="px-0"
                        onClick={() => onDelete(file)}>
                        <IconSquareX />
                    </UnstyledButton>
                </Group>
            ))}
        </Stack>
    );
};

export default FilesInput;
