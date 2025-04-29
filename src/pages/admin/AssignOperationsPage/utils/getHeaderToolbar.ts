import { isMobile } from "react-device-detect";

const getHeaderToolbar = () => {
    if (isMobile)
        return {
            left: "prev assignAutomatically",
            center: "title",
            right: "next",
        };
    return {
        left: "prev,next assignAutomatically",
        center: "title",
        right: "timeGridWeek,timeGridDay",
    };
};

export default getHeaderToolbar;
