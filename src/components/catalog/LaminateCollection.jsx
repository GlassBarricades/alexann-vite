import {
  Button,
  Title,
  Modal,
  Grid,
  Group,
  Card,
  Image,
  Text,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import AdminLaminateCollectionForm from "../admin/AdminLaminateCollectionForm";
import AdminLinoleumCollectionForm from "../admin/AdminLinoleumCollectionForm";

const LaminateCollection = () => {
  const { vendors, collection } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [laminateCollection] = useFetchData(
    `/${vendors}/${collection}/collection`
  );

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="100%"
        title={`Добавить коллекцию ${collection}`}
      >
        {vendors === "linoleum" ? (
          <AdminLinoleumCollectionForm collection={collection} close={close} />
        ) : undefined}
        {vendors === "laminate" ? (
          <AdminLaminateCollectionForm collection={collection} close={close} />
        ) : undefined}
      </Modal>
      <Group position="apart">
        <Title order={3}>{collection}</Title>
        <Button onClick={open} variant="default">
          Добавить коллекцию
        </Button>
      </Group>
      <Grid mt="lg">
        {laminateCollection.map((item, index) => {
          return (
            <Grid.Col md={2} key={index}>
              <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                <Card.Section>
                  <Image src={item.image} height={160} alt={item.name} />
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
export default LaminateCollection;
