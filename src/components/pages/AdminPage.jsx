import { Button, Navbar, Title, AppShell, Stack } from "@mantine/core";
import { Route, Routes, Link } from "react-router-dom";
import AdminVendors from "../admin/AdminVendors";
import CollectionAdmin from "../admin/CollectionAdmin";
import ColorAdmin from "../admin/ColorAdmin";
import AdminLaminateCollections from "../admin/AdminLaminateCollections";
import AdminLinoleumCollections from "../admin/AdminLinoleumCollections";
import AdminVinylFlooringCollections from "../admin/AdminVinylFlooringCollections";
import AdminMaterialDoors from "../admin/AdminMaterialDoors";
import { set, ref, remove } from "firebase/database";
import { db } from "../../firebase";

const writeToDatabase = (link, data, reset, close) => (e) => {
  e.preventDefault();
  set(ref(db, link), {
    ...data,
  });

  reset();
  close();
};

const handleDelete = (link) => {
  remove(ref(db, link));
};

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
            minHeight: "93vh",
          },
        })}
      >
        <Routes>
          <Route
            path={"/:vendors"}
            element={<AdminVendors writeToDatabase={writeToDatabase} />}
          />
          <Route
            path={"/linoleum/:collection"}
            element={
              <AdminLinoleumCollections
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path={"/laminate/:collection"}
            element={
              <AdminLaminateCollections
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path={"/vinyl-flooring/:collection"}
            element={
              <AdminVinylFlooringCollections
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path={"/interior-doors"}
            element={
              <AdminMaterialDoors
                writeToDatabase={writeToDatabase}
                handleDelete={handleDelete}
              />
            }
          />
          <Route
            path={"/interior-doors/:vendors"}
            element={<AdminVendors writeToDatabase={writeToDatabase} />}
          />
          <Route
            path={"/interior-doors/:vendors/:collection"}
            element={<AdminVendors writeToDatabase={writeToDatabase} />}
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
