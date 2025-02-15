import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";

import { Button, Center, Divider, Flex, Select, Stack, Text, Title } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { formatDate, formatDateTime, formatTime } from "utils/formatDateTime";
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
    OperationForProduct,
    OperationForSchedule,
    OperationsService,
    UserProfile,
} from "../../../../client";

export function AssignOperationsPage() {
    const { operationsToAssign, getProductsWithOperations } = useAssignOperations();

    const [currOperation, setCurrOperation] = useState<OperationForProduct | null>(null);
    const [execStart, setExecStart] = useState<Date | null>(new Date());
    const [techEmail, setTechEmail] = useState<string | null>(null);

    const calendarRef = useRef<FullCalendar | null>(null);
    const [techs, setTechs] = useState<UserProfile[]>([]);
    let operations: OperationForSchedule[] = [];

    const renderEventOperationContent = (eventInfo: EventContentArg) => {
        const oper = eventInfo.event.extendedProps;

        return (
            <Stack m="xs" gap="xs" h="100%" w="100%">
                <Text>{eventInfo.timeText}</Text>
                <Text>{oper.operationType?.name}</Text>
            </Stack>
        );
    };

    const setOperationExecStart = (operation: OperationForSchedule) => {
        const dateStart = new Date(operation.start);
        OperationsService.setOperationExecStart({
            operationId: operation.id,
            execStart: dateStart.toUTCString(),
        })
            .then(() => getProductsWithOperations())
            .catch(err => console.log(err));
    };

    async function getCalendarData(
        fetchInfo: EventSourceFuncArg,
        successCallback: (eventInputs: EventInput[]) => void,
    ) {
        if (techEmail) {
            const date: Date = fetchInfo.start;
            await OperationsService.getForSchedule({
                dateStart: formatDate(date),
                techEmail,
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

    const selectOperation = (operation: OperationForProduct) => {
        setCurrOperation(operation);
        setTechEmail(operation.tech?.email ?? null);
        if (operation.execStart) setExecStart(new Date(operation.execStart));
        else setExecStart(new Date());

        const groupId = getDepartmentIdByCode(operation.operationType.group);
        AccountsService.getTechniciansByGroup({ groupId })
            .then(techProfiles => {
                setTechs(techProfiles);
            })
            .catch(err => console.log(err));
    };

    const saveOperation = () => {
        if (!currOperation) {
            showErrorNotification("Операция не выбрана");
        } else if (!techEmail) {
            showErrorNotification("Техник не выбран");
        } else {
            const tech  = techs.find(tech => tech.email === techEmail);
            if (!(tech && execStart)) return;
            currOperation.tech = tech;
            currOperation.execStart = formatDateTime(execStart);
            OperationsService.assignOperation({
                requestBody: {
                    ...currOperation,
                    execStart: formatDate(new Date(currOperation.execStart)),
                },
            })
                .then(() => getProductsWithOperations())
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

    return (
        <Center>
            <Flex direction={{ base: "column", sm: "row" }}>
                <Stack gap={0} align="start">
                    <RoundedBoxContainer width="100%" minWidth="380px">
                        <Center mb="xs">
                            <Title order={4}>Назначение операции</Title>
                        </Center>
                        <Divider />
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
                                    {formatTime(
                                        currOperation?.operationType
                                            ?.execTime,
                                    )}
                                </Text>
                                <DateTimePicker
                                    my="xs"
                                    value={execStart}
                                    label="Начало выполнения"
                                    onChange={value => setExecStart(value)}
                                    minDate={new Date("01-01-2010")}
                                    maxDate={new Date("01-01-2100")}
                                />
                                <Select
                                    label="Техник"
                                    mb="xs"
                                    onChange={(_value, option) =>
                                        setTechEmail(option.value)
                                    }
                                    value={techEmail}
                                    data={techs.map(tech => {
                                        return {
                                            label: `${tech.lastName} ${tech.firstName}`,
                                            value: tech.email,
                                        };
                                    })}
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
                        timeZone="local"
                        allDaySlot={false}
                        ref={calendarRef}
                        events={(fetchInfo, successCallback) =>
                            getCalendarData(fetchInfo, successCallback)
                        }
                        eventContent={renderEventOperationContent}
                        eventDrop={event =>
                            setOperationExecStart(event.event as unknown as OperationForSchedule)
                        }
                        slotMinTime={"8:00"}
                        slotMaxTime={"19:00"}
                        snapDuration={"00:01"}
                        slotDuration={"00:15"}
                        headerToolbar={getHeaderToolbar()}
                    />
                </RoundedBoxContainer>
            </Flex>
        </Center>
    );
}
