import { isMobile } from "react-device-detect";

const getHeaderToolbar = () => {
    if (isMobile)
        return {
            left: "prev",
            center: "title",
            right: "next",
        };
    return {
        left: "prev,next",
        center: "title",
        right: "timeGridWeek,timeGridDay",
    };
};

export default getHeaderToolbar;
