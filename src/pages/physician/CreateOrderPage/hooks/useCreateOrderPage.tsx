import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import { WorkBrief } from "types/WorkTypes/WorkBrief.ts";
import { isMobile } from "react-device-detect";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { OrdersService, WorkType } from "../../../../client";

function useCreateOrderPage() {
    const { user } = useUserContext();
    const [listOfWorks, setListOfWorks] = useState<WorkBrief[]>([]);
    const [selectedWorkType, setSelectedWorkType] = useState<
        WorkType | null
    >(null);
    const [orderCost, setOrderCost] = useState(0);
    const [numberOfWorks, setNumberOfWorks] = useState<number>(1);
    const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
    const [comment, setComment] = useState("");

    // States for dental formula
    const [markedTeeth, setMarkedTeeth] = useState<Set<number>>(new Set());

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isVerified) navigate("/registration");
    }, []);

    const saveWork = () => {
        if (!selectedWorkType) {
            notifications.show({
                title: "Error",
                message: "Тип работы не выбран",
            });
            return;
        }
        const sumCost = (selectedWorkType.cost ?? 0) * numberOfWorks;
        setOrderCost(orderCost + sumCost);

        const work: WorkBrief = {
            workTypeId: selectedWorkType.id,
            workTypeName: selectedWorkType.name,
            workTypeCost: selectedWorkType.cost ?? 0,
            sumCost: sumCost,
            amount: numberOfWorks,
            teeth: [...markedTeeth],
        };

        listOfWorks.push(work);

        const set = new Set<number>();
        setMarkedTeeth(set);
    };

    const handleDelete = (work: WorkBrief) => {
        const list = [...listOfWorks];
        const index = list.indexOf(work);

        if (index > -1) {
            list.splice(index, 1);
            setListOfWorks(list);
            setOrderCost(orderCost - work.sumCost);
        }
    };

    const getToothMark = (num: number) => {
        const toothSizeStyle = isMobile
            ? styles.toothMarkMobile
            : styles.toothMarkDesktop;

        const toothStyle = markedTeeth.has(num)
            ? styles.markedTooth
            : styles.notMarkedTooth;

        const onClickFunc = () => {
            const teeth = new Set(markedTeeth.values());

            if (!teeth.has(num)) {
                teeth.add(num);
            } else {
                teeth.delete(num);
            }

            setMarkedTeeth(teeth);
        };

        return (
            <button
                type="button"
                onClick={onClickFunc}
                className={`${styles.toothMarkBase} ${toothSizeStyle} ${toothStyle}`}>
                {num}
            </button>
        );
    };

    const sendOrder = () => {
        if (!selectedCustomer) {
            notifications.show({
                title: "Error",
                message: "Организация-заказчик не выбран",
            });
            return;
        }
        console.log(listOfWorks);
        OrdersService.createOrder({
            requestBody: {
                comment,
                workTypes: listOfWorks,
                customerId: selectedCustomer,
            },
        })
            .then(() => {
                navigate("/");
                notifications.show({
                    title: "Success",
                    message: "Заказ успешно оформлен!",
                });
            })
            .catch(err => console.log(err));
    };

    return {
        listOfWorks,
        handleDelete,
        setSelectedWorkType,
        numberOfWorks,
        setNumberOfWorks,
        selectedCustomer,
        setSelectedCustomer,
        comment,
        setComment,
        getToothMark,
        orderCost,
        saveWork,
        sendOrder,
    };
}

export default useCreateOrderPage;
