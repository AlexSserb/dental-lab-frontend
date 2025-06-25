import { Center, Divider, Stack, Text, Title } from "@mantine/core";
import ManualImage from "./ManualImage.tsx";
import techMain from "/src/assets/screenshots/tech/tech-main.png";
import changeOpStatus from "/src/assets/screenshots/tech/change-op-status.png";
import techSchedule from "/src/assets/screenshots/tech/tech-schedule.png";
import techScheduleOpInfo from "/src/assets/screenshots/tech/tech-schedule-op-info.png";

const TechManual = () => {

    return (
        <Stack>
            <Center>
                <Title order={2}>Руководство пользователя</Title>
            </Center>
            <Divider />
            <Text>
                На главной странице (рис. 1) расположен список с назначенными операциями.
                Для получения более подробной информации об операции и работе нажмите на нее.
            </Text>
            <ManualImage
                src={techMain}
                alt={"Главная страница техника"}
                capture={"Рисунок 1 - Главная страница"}
            />
            <Text mt={"md"}>
                После нажатия на кнопку "Изменить статус операции" откроется модальное
                окно с подробной информацией и выбором статуса операции из выпадающего списка
                (рис. 2).
            </Text>
            <ManualImage
                src={changeOpStatus}
                alt={"Изменение статуса операции"}
                capture={"Рисунок 2 - Изменение статуса операции"}
            />
            <Text mt={"md"}>
                Просмотреть свое расписание можно нажав кнопку "Расписание". На странице
                с расписанием выводятся назначенные операции (рис. 3).
            </Text>
            <ManualImage
                src={techSchedule}
                alt={"Расписание техника"}
                capture={"Рисунок 3 - Расписание"}
            />
            <Text mt={"md"}>
                Нажатием на операцию в расписании можно открыть подробную информацию о ней (рис. 4).
            </Text>
            <ManualImage
                src={techScheduleOpInfo}
                alt={"Подробная информация об операции"}
                capture={"Рисунок 4 - Информация об операции"}
            />
        </Stack>
    );
};

export default TechManual;
