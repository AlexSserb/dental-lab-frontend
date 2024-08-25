import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Operation from "types/OperationTypes/Operation";
import OperationStatus from "types/OperationTypes/OperationStatus";

dayjs.extend(utc);
dayjs.extend(timezone);

const API_URL = "api/";

class OperationService {
    timeZone = dayjs?.tz?.guess();

    getForTech(page: number) {
        return axios.get(API_URL + `operations-for-tech/?page=${page}`);
    }

    getForProduct(productId: string) {
        return axios.get(API_URL + `operations-for-product/${productId}`);
    }

    getForSchedule(userEmail: string, date: string) {
        return axios.get(
            API_URL + `operations-for-schedule/${userEmail}/${date}`
        );
    }

    setOperationExecStart(operationId: string, datetime: string) {
        return axios.patch(
            API_URL + `operation-exec-start/${operationId}/${datetime}`
        );
    }

    getOperationStatuses(): Promise<AxiosResponse<OperationStatus[]>> {
        return axios.get(API_URL + "operation-statuses/");
    }

    setOperationStatus(operationId: string, statusId: string) {
        return axios.patch(API_URL + `operation/${operationId}/`, {
            status: statusId,
        });
    }

    assignOperation(operation: Operation) {
        return axios.patch(API_URL + "assign-operation/", {
            id: operation?.id,
            execStart: operation?.execStart?.toISOString(),
            techEmail: operation?.tech?.email,
        });
    }
}

const operationService = new OperationService();
export default operationService;
