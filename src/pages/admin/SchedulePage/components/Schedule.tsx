import FullCalendar from "@fullcalendar/react";
import { useRef, useState } from "react";
import { OperationForSchedule, OperationsService } from "../../../../client";
import { Box, Button, em, Group, rem, Stack, Tooltip } from "@mantine/core";
import { formatDate, formatTime } from "../../../../utils/formatDateTime.ts";
import { DateInput } from "@mantine/dates";
import { RoundedBoxContainer } from "../../../../components/RoundedBoxContainer";
import { IconAlertOctagon, IconCalendarEvent, IconCheck, IconLock, IconSearch } from "@tabler/icons-react";
import useTechniciansList from "../../../../hooks/useTechniciansList.tsx";
import ruLocale from "@fullcalendar/core/locales/ru";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import OperationEditDrawer from "../../../../components/OperationEditDrawer/OperationEditDrawer.tsx";
import { useOperationEditContext } from "../../../../components/OperationEditDrawer/contexts/OperationEditContext.tsx";
import { EventImpl } from "@fullcalendar/core/internal";
import { DateSpanApi } from "@fullcalendar/core";
import techIdToOperationGroup from "../../../../utils/techIdToOperationGroup.ts";
import InlineButton from "../../../../components/InlineButton/InlineButton.tsx";

export const Schedule = () => {
    const calendarRef = useRef<FullCalendar | null>(null);
    const calendarApi = calendarRef.current?.getApi();

    const [currDate, setCurrDate] = useState<Date | null>(null);
    let operations: OperationForSchedule[] = [];
    const { techs } = useTechniciansList();

    const [isOptimizedPlanShowed, setIsOptimizedPlanShowed] = useState<boolean>(false);

    const {
        updateOperation,
        setOperation,
        open,
    } = useOperationEditContext();

    const refetchOperations = () => {
        if (calendarApi) {
            calendarApi.refetchEvents();
        }
    };

    const renderEventOperationContent = (eventInfo: any) => {
        const oper = eventInfo.event.extendedProps;
        const operInfo: OperationForSchedule = {
            ...oper,
            id: eventInfo.event.id,
            start: eventInfo.event.start,
            end: eventInfo.event.end,
            resourceId: eventInfo.event.resourceId,
            editable: eventInfo.event.startEditable,
        };

        return (
            <Stack
                gap={0}
                mx="xs"
                h="100%"
                w="100%"
                onClick={() => {
                    setOperation(operInfo);
                    open();
                }}
            >
                <Group gap={em(10)}>
                    <div>{formatTime(eventInfo.event.start)}</div>
                    <Group gap={em(5)}>
                        {!eventInfo.event.startEditable && (
                            <IconLock size={rem(20)} />
                        )}
                        {oper.error && (
                            <Tooltip label={oper.errorDescription}>
                                <IconAlertOctagon size={em(20)} color={"#ba2020"} />
                            </Tooltip>
                        )}
                    </Group>
                </Group>
                <div>{oper.operationType?.name}</div>
                <div>{oper.product.productType?.name}</div>
            </Stack>
        );
    };

    async function getCalendarData(fetchInfo: any, successCallback: any) {
        const date: Date = fetchInfo.start;
        await OperationsService.getForSchedule({
            dateStart: formatDate(date),
        })
            .then(operationsForSchedule => {
                if (operationsForSchedule.length === 0) operations = [];
                else operations = operationsForSchedule;
                successCallback(operations);
            })
            .catch(err => console.log(err));
    }

    const getResources = () => {
        return techs.map(tech => ({
            id: tech.email,
            title: tech.lastName + " " + tech.firstName,
            group: tech.group,
        }));
    };

    const eventAllow = (dropInfo: DateSpanApi, draggedEvent: EventImpl | null) => {
        const tech = techs.find(tech => tech.email === dropInfo.resource?.id);
        const techGroupId = techIdToOperationGroup(tech?.groupId);
        const operationGroupId = draggedEvent?.extendedProps.operationType?.group;

        return techGroupId === operationGroupId;
    };

    const onApplyOptimizedPlanClick = () => {
        setIsOptimizedPlanShowed(false);
    };

    const onCreateOptimizedPlanClick = () => {
        setIsOptimizedPlanShowed(true);
    };

    const optimizedPlanButton = () => {
        if (isOptimizedPlanShowed) {
            return (
                <InlineButton
                    size="md"
                    onClick={onApplyOptimizedPlanClick}
                >
                    <IconCheck />
                    Применить план
                </InlineButton>
            );
        }
        return (
            <InlineButton
                size="md"
                onClick={onCreateOptimizedPlanClick}
            >
                <IconCalendarEvent />
                Составить оптимальный план
            </InlineButton>
        );
    };

    const getSearchByDateField = () => {
        if (isOptimizedPlanShowed) {
            return <div></div>;
        }
        return (
            <Group gap="xs">
                <DateInput
                    size="md"
                    value={currDate}
                    onChange={setCurrDate}
                />
                <Button
                    size="md"
                    onClick={() => currDate && calendarApi?.gotoDate(currDate)}
                >
                    <IconSearch />
                </Button>
            </Group>
        )
    }

    const getHeaderToolbar = () => {
        if (isOptimizedPlanShowed) {
            return {
                left: "",
                center: "title",
                right: "",
            };
        }
        return {
            left: "prev,next",
            center: "title",
            right: "",
        };
    };

    return (
        <RoundedBoxContainer width="99%" minWidth="380px" height="96vh">
            <Box miw="380px" mih="1vh">
                <Group mb="md" justify="space-between">
                    {getSearchByDateField()}
                    {optimizedPlanButton()}
                </Group>
                <FullCalendar
                    height="auto"
                    eventMinWidth={10}
                    plugins={[resourceTimelinePlugin, interactionPlugin]}
                    initialView={"resourceTimelineMonthRelative"}
                    views={{
                        resourceTimelineMonthRelative: {
                            type: "resourceTimeline",
                            duration: { days: 10 },
                            slotDuration: { minutes: 15 },
                        },
                    }}
                    resourceAreaHeaderContent={"Техники"}
                    resources={getResources()}
                    locale={ruLocale}
                    editable
                    nowIndicator
                    eventDurationEditable={false}
                    resourceAreaWidth={"15%"}
                    resourceGroupField={"group"}
                    eventAllow={eventAllow}
                    selectable
                    timeZone={"UTC"}
                    allDaySlot={false}
                    ref={calendarRef}
                    events={(fetchInfo, successCallback) =>
                        getCalendarData(fetchInfo, successCallback)
                    }
                    eventContent={renderEventOperationContent}
                    eventDrop={event => {
                        const resourceId = event.newResource?.id ?? event.oldResource?.id;
                        updateOperation(event.event as unknown as OperationForSchedule, refetchOperations, resourceId);
                    }}
                    slotMinTime={"8:00"}
                    slotMaxTime={"19:00"}
                    snapDuration={"00:05"}
                    slotDuration={"00:15"}

                    headerToolbar={getHeaderToolbar()}

                    slotLabelFormat={[
                        {
                            day: "2-digit",
                            month: "long",
                        },
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        },
                    ]}
                    schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
                />
            </Box>
            <OperationEditDrawer refetchOperations={refetchOperations} />
        </RoundedBoxContainer>
    );
};
