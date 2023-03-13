import { Anchor, Container, Group, Image, Stack, Text, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import useFetchDataOne from "../../hooks/useFetchDataOne";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";

const VendorPage = () => {
  const { vendor, category } = useParams();
  const [vendorData] = useFetchDataOne(`/${category}/${vendor}`);
  const [collectionData] = useFetchData(`/${category}/${vendor}/collection/`)
  const { name, position, uuid, image, description, advantages } = vendorData;
  return (
    <Container>
      <Title>{vendor}</Title>
      <Image width={500} src={image} alt={name}/>
      <Stack>
        <Text>Позиция в каталоге: {position}</Text>
        <Text>id: {uuid}</Text>
        <Text>Название: {name}</Text>
        <Group>
            <Text>Коллекции: </Text>
            {collectionData.map((item) => {
               return <Anchor key={item.uuid} component={Link} to={`${item.name}`}>{item.name}</Anchor>
            })}
        </Group>
        <Stack>
            <Title order={4}>Описание</Title>
            <Text>{description}</Text>
        </Stack>
        <Stack>
            <Title order={4}>Преимущества {name}</Title>
            <Text>{advantages}</Text>
        </Stack>
      </Stack>
    </Container>
  );
};
export default VendorPage;
