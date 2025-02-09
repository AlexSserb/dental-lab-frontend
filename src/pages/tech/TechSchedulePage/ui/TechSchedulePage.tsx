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
import operationService from "services/OperationService";
import { isLabAdmin } from "utils/permissions";
import { OperationForSchedule } from "../../../../types/OperationTypes/OperationForSchedule";
import { formatDate, formatTime } from "../../../../utils/formatDateTime";
import getHeaderToolbar from "../utils/getHeaderToolbar";

export const TechSchedulePage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const { user } = useUserContext();
    const { state } = useLocation();
    const techEmail = state?.techEmail || user?.email;

    const isEditable = isLabAdmin(user!);
    const calendarRef = useRef<FullCalendar | null>(null);
    const calendarApi = calendarRef.current?.getApi();

    const [currDate, setCurrDate] = useState<Date | null>(null);
    let operations: OperationForSchedule[] = [];

    const [operation, setOperation] = useState<OperationForSchedule | null>(
        null
    );

    const renderEventOperationContent = (eventInfo: any) => {
        const oper = eventInfo.event.extendedProps;

        return (
            <Stack
                m="xs"
                gap="xs"
                h="100%"
                w="100%"
                onClick={() => {
                    const operInfo: OperationForSchedule = {
                        id: eventInfo.event.id,
                        start: eventInfo.event.start,
                        end: eventInfo.event.end,
                        operationType: oper.operationType,
                        operationStatus: oper.operationStatus,
                        product: oper.product,
                    };
                    setOperation(operInfo);
                    open();
                }}>
                <Text>{eventInfo.timeText}</Text>
                <Text>{oper.operationType?.name}</Text>
            </Stack>
        );
    };

    const setOperationExecStart = (operation: OperationForSchedule) => {
        operationService
            .setOperationExecStart(operation.id, operation.start.toUTCString())
            .then(() => close())
            .catch(err => console.log(err));
    };

    async function getCalendarData(fetchInfo: any, successCallback: any) {
        const date: Date = fetchInfo.start;
        await operationService
            .getForSchedule(techEmail, formatDate(date))
            .then(res => {
                if (res?.data?.length === 0) operations = [];
                else operations = res.data;
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
                    {formatTime(operation.operationType.execTime)}
                </Text>
                <Text>Статус операции: {operation.operationStatus.name}</Text>
                <Text>Начало выполнения:</Text>
                <DateTimePicker
                    value={operation.start}
                    onChange={value =>
                        value && setOperation({ ...operation, start: value })
                    }
                    size="md"
                    readOnly={!isEditable}
                />
                {isEditable && (
                    <Button
                        onClick={() => {
                            setOperationExecStart(operation);
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
                            setOperationExecStart(event.event)
                        }
                        slotMinTime={"8:00"}
                        slotMaxTime={"19:00"}
                        snapDuration={"00:01"}
                        slotDuration={"00:15"}
                        headerToolbar={getHeaderToolbar()}></FullCalendar>
                </Box>
            </Stack>
            <Drawer opened={opened} onClose={close} title="Операция">
                {getDrawerContent()}
            </Drawer>
        </RoundedBoxContainer>
    );
};
