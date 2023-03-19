import { Button, Navbar, Title, AppShell, Stack } from "@mantine/core";
import { Route, Routes, Link } from "react-router-dom";
import AdminLaminate from "../admin/AdminLaminate";
import CollectionAdmin from "../admin/CollectionAdmin";
import ColorAdmin from "../admin/ColorAdmin";
import LaminateCollection from "../catalog/LaminateCollection";

const AdminPage = ({ dataCategory }) => {
  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            height={"92vh"}
            p="xs"
            width={{ base: 300 }}
            fixed={false}
            position={{ top: 0, left: 0 }}
          >
            <Navbar.Section>
              <Title align="center" order={3}>
                Меню
              </Title>
            </Navbar.Section>
            <Navbar.Section grow mt="md">
              <Stack>
                {dataCategory.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      variant="default"
                      component={Link}
                      to={item.link}
                    >
                      {item.name}
                    </Button>
                  );
                })}
              </Stack>
            </Navbar.Section>
          </Navbar>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Routes>
          <Route path={"/:vendors"} element={<AdminLaminate />} />
          <Route
            path={"/:vendors/:collection"}
            element={<LaminateCollection />}
          />
          <Route
            path={"/:vendors/:collection/:color"}
            element={<CollectionAdmin />}
          />
          <Route
            path={"/:vendors/:collection/:color/:colorName"}
            element={<ColorAdmin />}
          />
        </Routes>
      </AppShell>
    </>
  );
};
export default AdminPage;
