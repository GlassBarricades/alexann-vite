import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Title, Image, Container, Grid } from "@mantine/core";
import useFetchData from "../../hooks/useFetchData";

const ColorPage = () => {
  const { color, vendor, collection, category } = useParams();
  const [fotoData] = useFetchData(
    `/${category}/${vendor}/collection/${collection}/colors/${color}/photo/`
  );
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
      </Container>
    </>
  );
};
export default ColorPage;
