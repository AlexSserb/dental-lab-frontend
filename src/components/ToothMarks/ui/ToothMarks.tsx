import { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";

type ToothMarksProps = {
    teethList: number[];
};

export const ToothMarks = ({ teethList }: ToothMarksProps) => {
    const [markedTeeth, _] = useState(new Set(teethList));
    const [upperJaw, setUpperJaw] = useState<number[]>([]);
    const [lowerJaw, setLowerJaw] = useState<number[]>([]);

    const fillUpperJaw = () => {
        let arrUpperJaw = [];
        for (let num = 18; num >= 11; num--) {
            arrUpperJaw.push(num);
        }
        for (let num = 21; num <= 28; num++) {
            arrUpperJaw.push(num);
        }
        setUpperJaw(arrUpperJaw);
    };

    const fillLowerJaw = () => {
        let arrLowerJaw = [];
        for (let num = 48; num >= 41; num--) {
            arrLowerJaw.push(num);
        }
        for (let num = 31; num <= 38; num++) {
            arrLowerJaw.push(num);
        }
        setLowerJaw(arrLowerJaw);
    };

    useEffect(() => {
        fillUpperJaw();
        fillLowerJaw();
    }, []);

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
        </div>
    );
};
