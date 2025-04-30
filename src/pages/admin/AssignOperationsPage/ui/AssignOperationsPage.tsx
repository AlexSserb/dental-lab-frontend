import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";

import { Button, Center, Divider, Flex, Stack, Text, Title } from "@mantine/core";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { formatDate, formatStrTime } from "utils/formatDateTime";
import { getDepartmentIdByCode, getDepartmentName } from "utils/getDepartmentInfo";
import { showErrorNotification } from "utils/notifications";
import { useAssignOperations } from "../hooks/useAssignOperations";
import styles from "../styles/AssignOperationsStyles.module.css";
import OperationItem from "./OperationItem";
import { isMobile } from "react-device-detect";
import getHeaderToolbar from "../utils/getHeaderToolbar";
import { EventContentArg, EventInput, EventSourceFuncArg } from "fullcalendar";
import {
    AccountsService,
    OperationForTechSchedule,
    OperationForWork,
    OperationsService,
    UserProfile,
} from "../../../../client";
import TechSelect from "../../../../components/TechSelect/TechSelect.tsx";
import WorkStartDateTimePicker from "../../../../components/WorkStartDateTimePicker/WorkStartDateTimePicker.tsx";
import TitleWithBackButton from "../../../../components/TitleWithBackButton/TitleWithBackButton.tsx";
import { notifications } from "@mantine/notifications";

export function AssignOperationsPage() {
    const { operationsToAssign, getWorksWithOperations, selectedOrder } = useAssignOperations();

    const [currOperation, setCurrOperation] = useState<OperationForWork | null>(null);
    const [execStart, setExecStart] = useState<string | null>(null);
    const [tech, setTech] = useState<UserProfile | null>(null);

    const calendarRef = useRef<FullCalendar | null>(null);
    const calendarApi = calendarRef.current?.getApi();

    const [techs, setTechs] = useState<UserProfile[]>([]);
    let operations: OperationForTechSchedule[] = [];

    const refetchOperations = () => {
        if (calendarApi) {
            calendarApi.refetchEvents();
        }
    };

    const renderEventOperationContent = (eventInfo: EventContentArg) => {
        const oper = eventInfo.event.extendedProps;

        return (
            <Stack m="xs" gap="xs" h="100%" w="100%">
                <Text>{eventInfo.timeText}</Text>
                <Text>{oper.operationType?.name}</Text>
            </Stack>
        );
    };

    const updateOperation = (operation: OperationForTechSchedule) => {
        const dateStart = new Date(operation.start);
        OperationsService.updateOperation({
            requestBody: {
                operationId: operation.id,
                execStart: dateStart.toUTCString(),
            },
        })
            .then(() => getWorksWithOperations())
            .catch(err => console.log(err));
    };

    async function getCalendarData(
        fetchInfo: EventSourceFuncArg,
        successCallback: (eventInputs: EventInput[]) => void,
    ) {
        if (tech) {
            const date: Date = fetchInfo.start;
            await OperationsService.getForTechSchedule({
                dateStart: formatDate(date),
                techEmail: tech.email,
            })
                .then(operationsForSchedule => {
                    if (operationsForSchedule.length === 0) operations = [];
                    else operations = operationsForSchedule;
                    successCallback(operations);
                })
                .catch(err => console.log(err));
        } else {
            operations = [];
            successCallback(operations);
        }
    }

    const selectOperation = (operation: OperationForWork) => {
        setCurrOperation(operation);
        setTech(operation.tech ?? null);
        if (operation.execStart) setExecStart(operation.execStart);
        else setExecStart(null);

        const groupId = getDepartmentIdByCode(operation.operationType.group);
        AccountsService.getTechnicians({ groupId })
            .then(techProfiles => {
                setTechs(techProfiles);
            })
            .catch(err => console.log(err));
    };

    const saveOperation = () => {
        if (!currOperation) {
            showErrorNotification("Операция не выбрана");
        } else if (!tech) {
            showErrorNotification("Техник не выбран");
        } else {
            if (!execStart) return;
            currOperation.tech = tech;
            currOperation.execStart = new Date(execStart).toUTCString();
            OperationsService.assignOperation({
                requestBody: {
                    id: currOperation.id,
                    techEmail: currOperation.tech.email,
                    execStart: currOperation.execStart,
                },
            })
                .then(() => getWorksWithOperations())
                .catch(err => console.log(err));
        }
    };

    const getOperationStyle = (operationId: string) => {
        if (operationId !== currOperation?.id) return `${styles.operation}`;
        return `${styles.operation} ${styles.operationSelected}`;
    };

    const renderOpeartions = () => {
        return operationsToAssign
            .sort((a, b) => a.ordinalNumber - b.ordinalNumber)
            .map(operation => (
                <OperationItem
                    key={operation.id}
                    operation={operation}
                    getOperationStyle={getOperationStyle}
                    selectOperation={selectOperation}
                />
            ));
    };

    const assignAllOperationsAutomatically = () => {
        if (!selectedOrder) return;
        OperationsService.assignOrderOperations({
            requestBody: {
                order: selectedOrder.id,
            },
        })
            .then(() => {
                refetchOperations();
                notifications.show({
                    message: "Все операции из заказа распределены",
                });
            })
            .catch(err => console.log(err));
    };

    return (
        <Center>
            <Flex direction={{ base: "column", sm: "row" }}>
                <Stack gap={0} align="start">
                    <RoundedBoxContainer width="100%" minWidth="380px">
                        <TitleWithBackButton
                            title={"Назначение операции"}
                            backRef={"/order"}
                            isMini
                        />
                        {currOperation ? (
                            <>
                                <Text>
                                    Тип операции:{" "}
                                    {currOperation?.operationType?.name}
                                </Text>
                                <Text>
                                    Группа:{" "}
                                    {getDepartmentName(
                                        currOperation?.operationType?.group,
                                    )}
                                </Text>
                                <Text>
                                    Время выполнения:{" "}
                                    {formatStrTime(
                                        currOperation?.operationType
                                            ?.execTime,
                                    )}
                                </Text>
                                <WorkStartDateTimePicker
                                    my="xs"
                                    value={execStart ? new Date(execStart) : null}
                                    label="Начало выполнения"
                                    onChange={value => value && setExecStart(value.toLocaleString())}
                                />
                                <TechSelect
                                    onChange={setTech}
                                    value={tech}
                                    data={techs}
                                    mb="xs"
                                />
                                <Button
                                    mt="xs"
                                    variant="contained"
                                    onClick={() => saveOperation()}>
                                    Сохранить
                                </Button>
                            </>
                        ) : (
                            <Center mt="xs">
                                <Text>Операция не выбрана</Text>
                            </Center>
                        )}
                    </RoundedBoxContainer>
                    <RoundedBoxContainer width="100%" minWidth="380px">
                        <Center mb="xs">
                            <Title order={4}>Операции для заказа</Title>
                        </Center>
                        <Divider />
                        {operationsToAssign?.length > 0 ? (
                            renderOpeartions()
                        ) : (
                            <Center>
                                <Text>Операций нет</Text>
                            </Center>
                        )}
                    </RoundedBoxContainer>
                </Stack>

                <RoundedBoxContainer minWidth="380px">
                    <FullCalendar
                        height="auto"
                        plugins={[timeGridPlugin, interactionPlugin]}
                        locale={ruLocale}
                        editable={true}
                        eventDurationEditable={false}
                        selectable={true}
                        initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
                        weekends={false}
                        timeZone={"local"}
                        allDaySlot={false}
                        ref={calendarRef}
                        events={(fetchInfo, successCallback) =>
                            getCalendarData(fetchInfo, successCallback)
                        }
                        eventContent={renderEventOperationContent}
                        eventDrop={event =>
                            updateOperation(event.event as unknown as OperationForTechSchedule)
                        }
                        slotLabelFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            meridiem: false,
                        }}
                        slotMinTime={"8:00"}
                        slotMaxTime={"19:00"}
                        snapDuration={"00:01"}
                        slotDuration={"00:15"}
                        headerToolbar={getHeaderToolbar()}
                        customButtons={{
                            assignAutomatically: {
                                text: "Распределить все операции",
                                click: assignAllOperationsAutomatically,
                                hint: "Распределить все операции из данного заказа на техников",
                            },
                        }}
                    />
                </RoundedBoxContainer>
            </Flex>
        </Center>
    );
}
