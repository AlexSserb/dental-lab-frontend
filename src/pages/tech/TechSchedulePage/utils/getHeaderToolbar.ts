import { isMobile } from "react-device-detect";

const getHeaderToolbar = () => {
    if (isMobile)
        return {
            left: "assignAutomatically",
            center: "title",
            right: "",
        };
    return {
        left: "prev,next,assignAutomatically",
        center: "title",
        right: "timeGridWeek,timeGridDay",
    };
};

export default getHeaderToolbar;
