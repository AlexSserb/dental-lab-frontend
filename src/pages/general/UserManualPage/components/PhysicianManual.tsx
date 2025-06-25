import { Center, Divider, Stack, Text, Title } from "@mantine/core";
import physicianMain from "/src/assets/screenshots/physician/physician-main.png";
import physicianCreateOrder from "/src/assets/screenshots/physician/physician-create-order.png";
import physicianAddWorks from "/src/assets/screenshots/physician/physician-add-works.png";
import physicianMainOrdered from "/src/assets/screenshots/physician/physician-main-ordered.png";
import physicianProfile from "/src/assets/screenshots/physician/physician-profile.png";
import ManualImage from "./ManualImage.tsx";

const PhysicianManual = () => {

    return (
        <Stack>
            <Center>
                <Title order={2}>Руководство пользователя</Title>
            </Center>
            <Divider />
            <Text>
                На главной странице (рис. 1) слева представлены все заказы пользователя,
                справа подробная информация по заказу. В подробной информации по
                заказу представлен список с заказанными работами, цены и скидки
                на заказ и на отдельные работы.
            </Text>
            <ManualImage
                src={physicianMain}
                alt={"Главная страница заказчика"}
                capture={"Рисунок 1 - Главная страница"}
            />
            <Text mt={"md"}>
                Для того, чтобы перейти к оформлению заказа, нажмите на кнопку
                "Оформить заказ". Далее необходимо заполнить форму (рис. 2):<br />
                - выбрать клинику, от имени которой оформляется заказ;<br />
                - прикрепить файлы к заказу;<br />
                - выбрать оттенок зубов по шкале Vita.
            </Text>
            <ManualImage
                src={physicianCreateOrder}
                alt={"Оформление заказа"}
                capture={"Рисунок 2 - Форма заказа"}
            />
            <Text mt={"md"}>
                После этого нужно ввести перечень работ (рис. 3).
                Для добавления работы нужно:
                - выбрать тип работы;
                - ввести количество работ;
                - указать номера зубов на зубной формуле по двухцифровой системе Виола;
                - нажать на кнопку "Добавить работу".
            </Text>
            <ManualImage
                src={physicianAddWorks}
                alt={"Добавление работ"}
                capture={"Рисунок 3 - Добавление работ"}
            />
            <Text mt={"md"}>
                Когда все данные введены, нажать на кнопку "Оформить заказ". После
                успешного оформления откроется главная страница со списком заказов (рис. 4),
                а также в правом нижнем углу появится сообщение об успешном оформлении
                заказа. Справа выводится подробная информация о только что
                оформленном заказе.
            </Text>
            <ManualImage
                src={physicianMainOrdered}
                alt={"Заказ успешно оформлен"}
                capture={"Рисунок 4 - Главная страница после оформления заказа"}
            />
            <Text mt={"md"}>
                Пока наряд не оформлен, заказ можно отменить. Когда статус заказа
                сменится на "Готов", станет доступно сообщение о браке. Для каждой работы
                можно увидеть зубную формулу, нажав на кнопку напротив работы.
            </Text>
            <Text mt={"md"}>
                При переходе в профиль доступно изменение имени, прикрепленных заказчиков и пароля (рис. 5).
            </Text>
            <ManualImage
                src={physicianProfile}
                alt={"Профиль"}
                capture={"Рисунок 5 - Профиль"}
            />
        </Stack>
    );
};

export default PhysicianManual;
