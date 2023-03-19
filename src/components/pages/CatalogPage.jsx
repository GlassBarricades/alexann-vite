import { Container, Title, Text, Grid, Card, Image } from "@mantine/core";
import { Link } from "react-router-dom";

const CatalogPage = ({ dataCategory }) => {
  return (
    <Container>
      <Title>Каталог</Title>
      <Grid mt="lg">
        {dataCategory.map((item, index) => {
          return (
            <Grid.Col xs={6} sm={4} lg={3} key={index}>
              <Card
                shadow="sm"
                padding="xl"
                component={Link}
                to={item.link}
                style={{ minHeight: "250px" }}
              >
                <Card.Section>
                  <Image src={item.image} height={160} alt="No way!" />
                </Card.Section>

                <Text weight={500} size="lg" mt="xs">
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
export default CatalogPage;
