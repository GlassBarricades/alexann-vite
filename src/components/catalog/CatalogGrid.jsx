import { Container, Title, Card, Grid, Image, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const CatalogGrid = ({ dataCategory }) => {
  const { category } = useParams();
  const [dataVendors] = useFetchData(`${category}`);

  const title = dataCategory.filter((item) => {
    if (item.link === category) {
      return item;
    }
  });

  return (
    <Container>
      <Title mt="md">{title[0].name}</Title>
      <Grid mt="xs">
        {dataVendors.map((item, index) => {
          return (
            <Grid.Col xs={6} sm={4} lg={3} key={index}>
              <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                <Card.Section p="md">
                  <Image
                    fit="contain"
                    src={item.image}
                    height={100}
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
    </Container>
  );
};
export default CatalogGrid;
