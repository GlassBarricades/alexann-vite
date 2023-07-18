import {
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Card,
  Grid,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import useFetchDataOne from "../../hooks/useFetchDataOne";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

const VendorPage = () => {
  const { vendor, category } = useParams();
  const [vendorData] = useFetchDataOne(`/${category}/${vendor}`);
  const [collectionData] = useFetchData(`/${category}/${vendor}/collection/`);
  const { name, image, description, advantages } = vendorData;

  const fileredCollectionData = collectionData.filter((item) => {
    if (item.visible === false) {
      return item;
    }
  });

  return (
    <>
      <Group mt="md" position="apart">
        <Title>{name}</Title>
        <Image fit="contain" width={220} src={image} alt={name} />
      </Group>
      <Stack>
        <Title order={4}>Коллекции: </Title>
        <Grid>
          {fileredCollectionData.map((item, index) => {
            return (
              <Grid.Col sm={4} xs={6} md={3} key={index}>
                <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                  <Card.Section>
                    <Image src={item.image} height={160} alt="No way!" />
                  </Card.Section>

                  <Text weight={500} size="lg" mt="md">
                    {item.name}
                  </Text>
                </Card>
              </Grid.Col>
            );
          })}
        </Grid>
        <Stack>
          <Title order={4}>Описание</Title>
          <Text>{description}</Text>
        </Stack>
        <Stack>
          <Title order={4}>Преимущества {name}</Title>
          <Text>{advantages}</Text>
        </Stack>
      </Stack>
    </>
  );
};
export default VendorPage;
