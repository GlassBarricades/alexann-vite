import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import { Title, Image, Container, Grid } from "@mantine/core";
import useFetchData from "../../hooks/useFetchData";

const ColorPage = () => {
  const { color, vendor, collection } = useParams();
  const [fotoData] = useFetchData(
    `/laminate/${vendor}/collection/${collection}/colors/${color}/photo/`
  );
  return (
    <>
      <Container>
        <Title mt="xs" mb="md">
          {color}
        </Title>
        <Carousel mx="auto" withIndicators height={700} loop>
          {fotoData.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                {item !== "" ? <Image height={700} src={item} /> : undefined}
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
};
export default ColorPage;
