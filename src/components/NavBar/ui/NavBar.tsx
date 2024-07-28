import { AppShell, UnstyledButton } from "@mantine/core";
import { useUserContext } from "contexts/UserContext/useUserContext";
import classes from "components/NavBar/styles/NavBarStyles.module.css";
import PageInfo from "types/PageInfo";
import { useNavigate } from "react-router-dom";

type NavBarProps = {
    pages: PageInfo[];
};

export function NavBar({ pages }: NavBarProps) {
    const { user } = useUserContext();
    const navigate = useNavigate();

    const getMenu = () => {
        return pages.map(({ title, path, state }: PageInfo) => (
            <UnstyledButton
                className={classes.control}
                onClick={() => navigate(path, { state: state })}
                key={path}>
                {title}
            </UnstyledButton>
        ));
    };

    return (
        <AppShell.Navbar py="md" px={4}>
            {user ? (
                getMenu()
            ) : (
                <UnstyledButton
                    className={classes.control}
                    onClick={() => navigate("/login")}
                    key="/login">
                    Войти
                </UnstyledButton>
            )}
        </AppShell.Navbar>
    );
}
