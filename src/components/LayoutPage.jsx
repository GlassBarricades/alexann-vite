import { useState } from "react";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { HeaderSimple } from "./Header";
import NavBarApp from "./NavBarApp";

const App = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const links = [
        {
            link: "/",
            label: "Главная",
        },
        {
            link: "/catalog",
            label: "Каталог",
        },
        {
            link: "/services",
            label: "Услуги",
        },
        {
            link: "/delivery",
            label: "Доставка",
        },
        {
            link: "/about-us",
            label: "О нас",
        },
        {
            link: "/contacts",
            label: "Контакты",
        },
        {
            link: "/admin/laminate",
            label: "Админка",
        },
    ];
    return (
        <AppShell
            styles={{
                main: {
                    background:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
               navbar={<NavBarApp links={links} opened={opened} setOpened={setOpened} />}
               footer={
                 <Footer height={60} p="md">
                   AlexAnn
                 </Footer>
               }
            header={
                <HeaderSimple
                    links={links}
                    opened={opened}
                    setOpened={setOpened}
                />
            }
        >
            <Outlet />
        </AppShell>
    );
};
export default App;