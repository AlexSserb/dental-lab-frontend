import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "components/ToothMarks/styles/ToothMarksStyles.module.css";
import { WorkBrief } from "types/WorkTypes/WorkBrief.ts";
import { isMobile } from "react-device-detect";
import { useUserContext } from "contexts/UserContext/useUserContext";
import { OrderDraftResponse, OrdersService, WorksService, WorkType } from "../../../../client";
import { modals } from "@mantine/modals";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { FileWithPath } from "@mantine/dropzone";
import axios from "axios";

type CreateOrderForm = {
    customerId: string | null;
    comment: string;
    toothColor: string;
    deadline: Date | null;
    files: FileWithPath[];
}

function useCreateOrderPage() {
    const { user, authTokens } = useUserContext();
    const [listOfWorks, setListOfWorks] = useState<WorkBrief[]>([]);
    const [selectedWorkType, setSelectedWorkType] = useState<
        WorkType | null
    >(null);
    const [orderCost, setOrderCost] = useState(0);
    const [numberOfWorks, setNumberOfWorks] = useState<number>(1);

    const form = useForm<CreateOrderForm>({
        initialValues: {
            customerId: null,
            comment: "",
            toothColor: "A1",
            deadline: null,
            files: [],
        },
        validate: {
            customerId: value =>
                !value && "Укажите организацию-заказчика",
        },
    });

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

    const applyDraft = async (draft: OrderDraftResponse) => {
        const workTypes = await WorksService.getWorkTypes();
        const works: WorkBrief[] = [];
        draft.works.forEach(w => {
            const type = workTypes.find(t => t.id === w.workTypeId);
            if (!type) return;
            const cost = type.cost ?? 0;
            works.push({
                workTypeId: type.id,
                workTypeName: type.name,
                workTypeCost: cost,
                sumCost: cost * w.amount,
                amount: w.amount,
                teeth: w.teeth,
            });
        });

        const apply = () => {
            if (works.length > 0) {
                setListOfWorks(works);
                setOrderCost(works.reduce((sum, w) => sum + w.sumCost, 0));
            }
            if (draft.toothColor) form.setFieldValue("toothColor", draft.toothColor);
            if (draft.deadline) form.setFieldValue("deadline", dayjs(draft.deadline).toDate());
            if (draft.comment && !form.values.comment) form.setFieldValue("comment", draft.comment);
        };

        // The draft replaces the works list, so ask before throwing away what the doctor already entered
        if (listOfWorks.length > 0 && works.length > 0) {
            modals.openConfirmModal({
                title: "Заменить добавленные работы?",
                children: "Черновик от ИИ заменит текущий список работ. Проверьте его перед отправкой заказа.",
                labels: { confirm: "Заменить", cancel: "Отмена" },
                onConfirm: apply,
            });
        } else {
            apply();
        }
    };

    const onOrderCreatedSuccessfully = () => {
        navigate("/");
        notifications.show({
            title: "Success",
            message: "Заказ успешно оформлен!",
        });
    };

    const loadOrderFiles = async (files: FileWithPath[], orderId: string) => {
        if (files.length === 0) {
            onOrderCreatedSuccessfully();
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        axios.post("/orders/load-files/" + orderId, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${authTokens?.access}`,
            },
        })
            .then(() => {
                onOrderCreatedSuccessfully();
            })
            .catch(err => console.log(err));
    };

    const sendOrder = async (values: CreateOrderForm) => {
        OrdersService.createOrder({
            requestBody: {
                comment: values.comment,
                workTypes: listOfWorks,
                customerId: values.customerId!,
                toothColor: values.toothColor,
                // Only sent when set (by the AI draft or the doctor); otherwise the server default applies
                deadline: values.deadline ? dayjs(values.deadline).format("YYYY-MM-DD") : undefined,
            },
        })
            .then(({ orderId }) => {
                loadOrderFiles(values.files, orderId);
            })
            .catch(err => console.log(err));
    };

    return {
        listOfWorks,
        handleDelete,
        setSelectedWorkType,
        numberOfWorks,
        setNumberOfWorks,
        form,
        getToothMark,
        orderCost,
        saveWork,
        sendOrder,
        applyDraft,
    };
}

export default useCreateOrderPage;
