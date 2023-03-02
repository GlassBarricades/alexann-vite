import {
  Container,
  Grid,
  Image,
  Paper,
  Text,
  Title,
  List,
  Flex,
} from "@mantine/core";

const DeliveryPage = () => {
  return (
    <Container>
      <Grid mt="xl">
        <Grid.Col sm={6}>
          <Flex style={{height: "100%"}} direction="column" justify="center" align="center">
            <Title align="center" mb="md">
              Доставка
            </Title>
            <Paper>
              <List>
                <List.Item>
                  НАПОЛЬНЫЕ ПОКРЫТИЯ: доставка до подъезда — БЕСПЛАТНО;
                </List.Item>
                <List.Item>
                  СТРОИТЕЛЬНЫЕ МАТЕРИАЛЫ: по городу — 5 руб.;
                </List.Item>
                <List.Item>
                  ДВЕРИ (без установки): до подъезда, без подъема на этаж —
                  БЕСПЛАТНО;
                </List.Item>
                <List.Item>
                  ДВЕРИ (с установкой ): в квартиру — БЕСПЛАТНО;
                </List.Item>
              </List>
              <Text mt="md">
                Выезд за город оговаривается с клиентом отдельно и зависит от
                объема приобретенного товара.
              </Text>
            </Paper>
          </Flex>
        </Grid.Col>
        <Grid.Col sm={6}>
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/delivery_car_icon_221019.svg?alt=media&token=e251a50d-e9c6-4378-91f8-6bc10b86d0ca"
            }
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default DeliveryPage;
