import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Title, Image, Container, Grid, Text, Stack } from "@mantine/core";
import useFetchData from "../../hooks/useFetchData";
import useFetchDataOne from "../../hooks/useFetchDataOne";

const ColorPage = () => {
  const { color, vendor, collection, category } = useParams();
  const [fotoData] = useFetchData(
    `/${category}/${vendor}/collection/${collection}/colors/${color}/photo/`
  );
  const [data] = useFetchDataOne(
    `/${category}/${vendor}/collection/${collection}`
  );
  const {
    description,
    advantages,
    abrasionClass,
    amountPackage,
    chamfer,
    loadClass,
    lock,
    panelSize,
    uuid,
    thickness,
    warmFloor,
    warrantyPeriod,
    waterResistance,
    country,
  } = data;
  return (
    <>
      <Container>
        <Title mt="xs" mb="md">
          {color}
        </Title>
        <Carousel mx="auto" withIndicators height={700} loop>
          {fotoData.map((item, index) => {
            return item !== "" ? (
              <Carousel.Slide key={index}>
                <Image height={700} src={item} />
              </Carousel.Slide>
            ) : undefined;
          })}
        </Carousel>
        <Stack mt="md">
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
    </>
  );
};
export default ColorPage;
