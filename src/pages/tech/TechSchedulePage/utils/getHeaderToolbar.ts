import { isMobile } from "react-device-detect";

const getHeaderToolbar = () => {
    if (isMobile)
        return {
            left: "",
            center: "title",
            right: "",
        };
    return {
        left: "prev,next",
        center: "title",
        right: "timeGridWeek,timeGridDay",
    };
};

export default getHeaderToolbar;
