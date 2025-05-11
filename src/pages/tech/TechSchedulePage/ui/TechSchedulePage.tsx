import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef, useState } from "react";

import { useLocation } from "react-router-dom";

import { Box, Button, Center, Divider, Drawer, Flex, Stack, Text, Title } from "@mantine/core";
import { DateInput, DateTimePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { RoundedBoxContainer } from "components/RoundedBoxContainer";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { isMobile } from "react-device-detect";
import { isLabAdmin } from "utils/permissions";
import { formatDate, formatStrTime } from "../../../../utils/formatDateTime";
import getHeaderToolbar from "../utils/getHeaderToolbar";
import { OperationForTechSchedule, OperationsService } from "../../../../client";

export const TechSchedulePage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { user } = useUserContext();
    const { state } = useLocation();
    const techEmail = state?.techEmail || user?.email;

    const isEditable = isLabAdmin(user!);
    const calendarRef = useRef<FullCalendar | null>(null);
    const calendarApi = calendarRef.current?.getApi();

    const [currDate, setCurrDate] = useState<Date | null>(null);
    let operations: OperationForTechSchedule[] = [];

    const [operation, setOperation] = useState<OperationForTechSchedule | null>(null);

    const renderEventOperationContent = (eventInfo: any) => {
        const oper = eventInfo.event.extendedProps;

        return (
            <Stack
                m="xs"
                gap="xs"
                h="100%"
                w="100%"
                onClick={() => {
                    const operInfo: OperationForTechSchedule = {
                        id: eventInfo.event.id,
                        start: eventInfo.event.start,
                        end: eventInfo.event.end,
                        operationType: oper.operationType,
                        operationStatus: oper.operationStatus,
                        work: oper.work,
                        editable: oper.editable,
                        execTime: oper.execTime,
                    };
                    setOperation(operInfo);
                    open();
                }}>
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
            .catch(err => console.log(err));
    };

    async function getCalendarData(fetchInfo: any, successCallback: any) {
        const date: Date = fetchInfo.start;
        await OperationsService.getForTechSchedule({
            dateStart: formatDate(date),
            techEmail,
        })
            .then(operationsForSchedule => {
                if (operationsForSchedule.length === 0) operations = [];
                else operations = operationsForSchedule;

                if (!isEditable) {
                    operations = operations.map(operation => ({ ...operation, editable: false }));
                }
                successCallback(operations);
            })
            .catch(err => console.log(err));
    }

    const getDrawerContent = () => {
        if (!operation) return null;
        return (
            <Stack gap="xs">
                <Divider />
                <Text>Тип операции: {operation.operationType.name}</Text>
                <Text>
                    Время выполнения:{" "}
                    {formatStrTime(operation.execTime)}
                </Text>
                <Text>Статус операции: {operation.operationStatus.name}</Text>
                <Text>Начало выполнения:</Text>
                <DateTimePicker
                    value={new Date(operation.start)}
                    onChange={value =>
                        value && setOperation({ ...operation, start: formatDate(value) })
                    }
                    size="md"
                    readOnly={!isEditable}
                />
                {isEditable && (
                    <Button
                        onClick={() => {
                            updateOperation(operation);
                        }}>
                        Сохранить изменения
                    </Button>
                )}
            </Stack>
        );
    };

    return (
        <RoundedBoxContainer width="90%" minWidth="380px">
            <Stack>
                <Center>
                    <Title order={3} pt={10}>
                        Расписание {techEmail}
                    </Title>
                </Center>
                <Divider />
                <Box p={isMobile ? 0 : 20} miw="380px" mih="1vh">
                    <Flex mb="xs" gap="xs">
                        <DateInput
                            size="md"
                            value={currDate}
                            onChange={setCurrDate}
                        />
                        <Button
                            size="md"
                            onClick={() =>
                                currDate && calendarApi?.gotoDate(currDate)
                            }>
                            <IconSearch />
                        </Button>
                    </Flex>
                    <FullCalendar
                        height="auto"
                        eventMinWidth={10}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        locale={ruLocale}
                        editable={isEditable}
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
                        eventDrop={(event: any) =>
                            updateOperation(event.event)
                        }
                        slotMinTime={"8:00"}
                        slotMaxTime={"19:00"}
                        snapDuration={"00:01"}
                        slotDuration={"00:15"}
                        headerToolbar={getHeaderToolbar()}
                        slotLabelFormat={{
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                            meridiem: false,
                        }}
                    />
                </Box>
            </Stack>
            <Drawer opened={opened} onClose={close} title="Операция">
                {getDrawerContent()}
            </Drawer>
        </RoundedBoxContainer>
    );
};
