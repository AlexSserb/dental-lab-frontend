import { useEffect, useState } from "react";

function useFillJawArrays() {
    const [upperJaw, setUpperJaw] = useState<number[]>([]);
    const [lowerJaw, setLowerJaw] = useState<number[]>([]);

    // Functions to fill in the dental formula in the form
    const fillUpperJaw = () => {
        const arrUpperJaw = [];
        for (let num = 18; num >= 11; num--) arrUpperJaw.push(num);
        for (let num = 21; num <= 28; num++) arrUpperJaw.push(num);
        setUpperJaw(arrUpperJaw);
    };
    const fillLowerJaw = () => {
        const arrLowerJaw = [];
        for (let num = 48; num >= 41; num--) arrLowerJaw.push(num);
        for (let num = 31; num <= 38; num++) arrLowerJaw.push(num);
        setLowerJaw(arrLowerJaw);
    };

    useEffect(() => {
        fillUpperJaw();
        fillLowerJaw();
    }, []);

    return { upperJaw, lowerJaw };
}

export default useFillJawArrays;
