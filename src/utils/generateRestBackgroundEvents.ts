import { BackgroundEvent } from "../types/BackgroundEvent.ts";

const generateRestBackgroundEvents = (date: Date, resources: string[]): BackgroundEvent[] => {
    const color = "#a0dbf2";
    const startTime = "T12:00:00";
    const endTime = "T13:00:00";

    const events: BackgroundEvent[] = [];

    resources.forEach(resourceId => {
        const localDate = new Date(date);
        for (let i = 0; i < 20; i++) {
            const dateStr = localDate.toISOString().substring(0, 10);
            const event = {
                start: dateStr + startTime,
                end: dateStr + endTime,
                display: "background",
                resourceId,
                color,
            };
            events.push(event);
            localDate.setDate(localDate.getDate() + 1);
        }
    });


    return events;
};

export default generateRestBackgroundEvents;
