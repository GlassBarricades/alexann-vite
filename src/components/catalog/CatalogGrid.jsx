import { Container, Title } from "@mantine/core";
import { useParams } from "react-router-dom";

const CatalogGrid = ({ dataCategory }) => {
  const { category } = useParams();

  const title = dataCategory.filter((item) => {
    if (item.link === category) {
      return item;
    }
  });

  return (
    <Container>
      <Title>{title[0].name}</Title>
    </Container>
  );
};
export default CatalogGrid;
