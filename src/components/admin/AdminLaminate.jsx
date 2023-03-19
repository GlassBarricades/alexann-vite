import {
  Title,
  Button,
  Modal,
  Text,
  Card,
  Image,
  Grid,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import AdminLaminateForm from "./AdminLaminateForm";

const AdminLaminate = () => {
  const { vendors } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [laminateVendors] = useFetchData(`/${vendors}/`);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        title="Добавление производителя"
      >
        <AdminLaminateForm vendors={vendors} close={close} />
      </Modal>
      <Group position="apart">
        <Title order={2}>Производители</Title>
        <Button onClick={open} variant="default">
          Добавить производителя
        </Button>
      </Group>
      <Grid mt="lg">
        {laminateVendors.map((item, index) => {
          return (
            <Grid.Col md={2} key={index}>
              <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                <Card.Section p="md">
                  <Image
                    fit="contain"
                    src={item.image}
                    height={160}
                    alt={item.name}
                  />
                </Card.Section>

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};
export default AdminLaminate;
