import { OrderFile, OrdersService } from "../../client";
import { Button, Table } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import getFileSizeStr from "../../utils/getFileSizeStr.ts";
import { notifications } from "@mantine/notifications";


type Props = {
    files: OrderFile[];
}

const OrderFilesList = ({ files }: Props) => {
    const onDownloadClick = (file: OrderFile) => {
        OrdersService.downloadFile({ fileId: file.id })
            .then(response => {
                // Convert base64 to binary
                const binaryString = atob(response.base64String);
                const bytes = new Uint8Array(binaryString.length);

                for (let i = 0; i < binaryString.length; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                }

                // Create a blob from the binary data
                const blob = new Blob([bytes], { type: response.mimeType });

                const url = URL.createObjectURL(blob);
                const fileWindow = window.open(url, response.filename);
                if (!fileWindow) {
                    notifications.show({ message: "Ошибка" });
                    return;
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <Table withTableBorder>
            {files.map((file: OrderFile) => (
                <Table.Tr flex={10} key={file.id}>
                    <Table.Td flex={6}>
                        {file.originalName}
                    </Table.Td>
                    <Table.Td flex={2}>
                        {getFileSizeStr(file.size)}
                    </Table.Td>
                    <Table.Td flex={2} align={"right"}>
                        <Button
                            onClick={() => onDownloadClick(file)}
                            variant={"outline"}
                        >
                            <IconDownload />
                        </Button>
                    </Table.Td>
                </Table.Tr>
            ))}
        </Table>
    );
};

export default OrderFilesList;
