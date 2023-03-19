import {
  Container,
  Title,
  Stack,
  Text,
  Image,
  Card,
  Grid,
  Modal,
  Button,
  Group,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import useFetchDataOne from "../../hooks/useFetchDataOne";
import useFetchData from "../../hooks/useFetchData";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

const CollectionPage = () => {
  const { collection, category, vendor } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [collectionData] = useFetchDataOne(
    `/${category}/${vendor}/collection/${collection}`
  );
  const [colorsData] = useFetchData(
    `/${category}/${vendor}/collection/${collection}/colors`
  );
  const {
    abrasionClass,
    advantages,
    amountPackage,
    chamfer,
    country,
    description,
    loadClass,
    lock,
    panelSize,
    thickness,
    uuid,
    warmFloor,
    warrantyPeriod,
    waterResistance,
  } = collectionData;
  return (
    <Container>
      <Title mt="lg">{collection}</Title>
      <Grid mt="lg">
        {colorsData.map((item) => {
          return (
            <Grid.Col md={3} key={item.uuid}>
              <Card
                shadow="sm"
                padding="xl"
                component={Link}
                to={item.nameColor}
                style={{ minHeight: "305px" }}
              >
                <Card.Section>
                  <Image src={item.photo.foto} height={160} alt="No way!" />
                </Card.Section>

                <Text mt="xs" color="dimmed" size="sm">
                  {item.colorPrice} руб
                </Text>

                <Text weight={500} size="lg" mt="xs">
                  {item.nameColor}
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <Stack>
        <Text>{description}</Text>
        <Text>{advantages}</Text>
        <Text>{abrasionClass}</Text>
        <Text>{amountPackage}</Text>
        <Text>{chamfer}</Text>
        <Text>{loadClass}</Text>
        <Text>{lock}</Text>
        <Text>{panelSize}</Text>
        <Text>{uuid}</Text>
        <Text>{thickness}</Text>
        <Text>{warmFloor}</Text>
        <Text>{warrantyPeriod}</Text>
        <Text>{waterResistance}</Text>
        <Text>{country}</Text>
      </Stack>
    </Container>
  );
};
export default CollectionPage;
