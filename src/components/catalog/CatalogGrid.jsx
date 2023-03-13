import { Anchor, Container, Stack, Title } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";

const CatalogGrid = ({ dataCategory }) => {
  const { category } = useParams();
  const [dataVendors] = useFetchData(`${category}`)

  const title = dataCategory.filter((item) => {
    if (item.link === category) {
      return item;
    }
  });

  return (
    <Container>
      <Title>{title[0].name}</Title>
      <Stack>
      {dataVendors.map((item) => {
        return <Anchor key={item.uuid} component={Link} to={`${item.name}`}>{item.name}</Anchor>
      })}
      </Stack>
    </Container>
  );
};
export default CatalogGrid;
