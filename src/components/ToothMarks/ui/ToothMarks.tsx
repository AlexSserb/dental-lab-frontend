import { isMobile } from "react-device-detect";
import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import useFillJawArrays from "../hooks/useFillJawArrays.tsx";
import { ScrollArea } from "@mantine/core";

type ToothMarksProps = {
    teethList?: number[];
};

export const ToothMarks = ({ teethList }: ToothMarksProps) => {
    const markedTeeth = new Set(teethList);
    const { upperJaw, lowerJaw } = useFillJawArrays();

    const getToothMark = (num: number) => {
        const toothSizeStyle = isMobile
            ? styles.toothMarkMobile
            : styles.toothMarkDesktop;

        const toothStyle = markedTeeth.has(num)
            ? styles.markedTooth
            : styles.notMarkedTooth;

        return (
            <div
                className={`${styles.toothMarkBase} ${toothSizeStyle} ${toothStyle}`}>
                {num}
            </div>
        );
    };

    return (
        <div>
            <ScrollArea>
                <table className="text-center">
                    <tbody>
                    <tr>
                        {upperJaw.map(tooth => {
                            return <td key={tooth}>{getToothMark(tooth)}</td>;
                        })}
                    </tr>
                    <tr>
                        {lowerJaw.map(tooth => {
                            return <td key={tooth}>{getToothMark(tooth)}</td>;
                        })}
                    </tr>
                    </tbody>
                </table>
            </ScrollArea>
        </div>
    );
};
