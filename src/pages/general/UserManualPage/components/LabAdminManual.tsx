import { Center, Divider, Stack, Text, Title } from "@mantine/core";
import ManualImage from "./ManualImage.tsx";
import adminMain from "/src/assets/screenshots/admin/admin-main.png";
import adminOrderInfo from "/src/assets/screenshots/admin/admin-order-info.png";
import adminConfirmOrder from "/src/assets/screenshots/admin/admin-confirm-order.png";
import assignOperations from "/src/assets/screenshots/admin/assign-operations.png";
import workInfo from "/src/assets/screenshots/admin/work-info.png";

const LabAdminManual = () => {
    return (
        <Stack>
            <Center>
                <Title order={2}>Руководство пользователя</Title>
            </Center>
            <Divider />
            <Text>
                На главной странице выводится список заказов за выбранный месяц (рис. 1)
            </Text>
            <ManualImage
                src={adminMain}
                alt={"Главная страница"}
                capture={"Рисунок 1 - Главная страница"}
            />
            <Text mt={"md"}>
                Для просмотра информации о заказе нужно нажать на кнопку в столбце
                "Подробнее" напротив нужного заказа. Откроется страница с заказом (рис. 2),
                на которой выводится список заказанных работ, прикрепленные файлы,
                и общая информация о заказе. Также, если наряд на заказ оформлен,
                то будут доступны документы для печати.
            </Text>
            <ManualImage
                src={adminOrderInfo}
                alt={"Подробная информация о заказе"}
                capture={"Рисунок 2 - Подробная информация о заказе"}
            />
            <Text mt={"md"}>
                После нажатия на кнопку "Начать оформление наряда" открывается
                страница для подтверждения цен и установки скидок (рис. 3).
                Можно установить скидку в левой части страницы для всех работ в заказе,
                а также выбрать заказ и установить для него скидку в правой части
                страницы. Результирующей скидкой для работы будет наибольшая из
                скидок на заказ и на данную работу. Для сохранения цен нужно нажать
                на кнопку "Оформить наряд".
            </Text>
            <ManualImage
                src={adminConfirmOrder}
                alt={"Оформление наряда"}
                capture={"Рисунок 3 - Оформление наряда"}
            />
            <Text mt={"md"}>
                После оформления наряда клиент не сможет отменить наряд. Далее можно
                перейти к распределению операций на техников, нажав на кнопку
                "Назначить операции". Откроется страница со списком операций и расписанием (рис. 4).
                Слева находится список операций, сверху над ними выбранная для назначения операция.
                Справа расписание техника для выбранной операции. Чтобы распределить все
                операции автоматически, нужно нажать на кнопку "Распределить автоматически".
            </Text>
            <ManualImage
                src={assignOperations}
                alt={"Распределение операций на техников"}
                capture={"Рисунок 4 - Страница распределения операций"}
            />
            <Text mt={"md"}>
                На странице с подробной информацией о заказе можно нажать "Подробнее",
                чтобы открыть страницу с информацией о работе (рис. 5).
            </Text>
            <ManualImage
                src={workInfo}
                alt={"Информация о работе"}
                capture={"Рисунок 5 - Информация о работе"}
            />
        </Stack>
    );
};

export default LabAdminManual;
