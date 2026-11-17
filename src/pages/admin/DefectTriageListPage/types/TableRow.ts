import { TriageListItem } from "../../../../client";

type TableRow = {
    id: string;
    createdAt: string;
    orderId: string;
    comment: string;
    state: TriageListItem["state"];
    revisions: number;
    decision: TriageListItem["decision"];
};

export default TableRow;
