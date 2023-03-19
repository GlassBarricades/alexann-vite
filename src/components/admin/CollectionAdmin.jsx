import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Stack,
  Text,
  Title,
  Button,
  Modal,
  TextInput,
  Image,
  Group,
  Grid,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useFetchDataOne from "../../hooks/useFetchDataOne";
import useFetchData from "../../hooks/useFetchData";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import { Link } from "react-router-dom";

const CollectionAdmin = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { color, collection, vendors } = useParams();
  const [nameColor, setNameColor] = useState("");
  const [colorPrice, setColorPrice] = useState("");
  const [vendorCodeColor, setVendorCodeColor] = useState("");
  const [foto, setFoto] = useState("");
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [collectionData] = useFetchDataOne(
    `/${vendors}/${collection}/collection/${color}`
  );
  const [colorsData] = useFetchData(
    `/${vendors}/${collection}/collection/${color}/colors/`
  );
  const {
    abrasionClass,
    advantages,
    amountPackage,
    chamfer,
    country,
    description,
    loadClass,
    lock,
    name,
    panelSize,
    position,
    thickness,
    uuid,
    warmFloor,
    warrantyPeriod,
    waterResistance,
    image,
  } = collectionData;
  console.log(collectionData);

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(
      ref(
        db,
        `/laminate/${collection}/collection/${color}/colors/${nameColor}`
      ),
      {
        nameColor,
        colorPrice,
        vendorCodeColor,
        uuid,
      }
    );
    set(
      ref(
        db,
        `/laminate/${collection}/collection/${color}/colors/${nameColor}/photo/`
      ),
      {
        foto,
        foto2,
        foto3,
      }
    );

    setFoto("");
    setFoto2("");
    setFoto3("");

    setNameColor("");
    setColorPrice("");
    setVendorCodeColor("");
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={`Добавить цвет ${color}`}>
        <form id="driver-form" onSubmit={writeToDatabase}>
          <TextInput
            label="Название"
            placeholder="Название"
            value={nameColor}
            onChange={(e) => setNameColor(e.target.value)}
            required
          />
          <TextInput
            label="Цена"
            placeholder="Цена"
            value={colorPrice}
            onChange={(e) => setColorPrice(e.target.value)}
            required
          />
          <TextInput
            label="Артикул"
            placeholder="Артикул"
            value={vendorCodeColor}
            onChange={(e) => setVendorCodeColor(e.target.value)}
          />
          <TextInput
            label="Картинка-1"
            placeholder="Картинка"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
          <TextInput
            label="Картинка-2"
            placeholder="Картинка"
            value={foto2}
            onChange={(e) => setFoto2(e.target.value)}
          />
          <TextInput
            label="Картинка-3"
            placeholder="Картинка"
            value={foto3}
            onChange={(e) => setFoto3(e.target.value)}
          />
          <Button mt="md" type="submit">
            Создать
          </Button>
        </form>
      </Modal>
      <Group position="apart">
        <Title>{color}</Title>
        <Button onClick={open} variant="default">
          Добавить цвет
        </Button>
      </Group>
      <Grid mt="lg">
        {colorsData.map((item) => {
          return (
            <Grid.Col md={3} xl={2} sm={4} key={item.uuid}>
              <Card
                shadow="sm"
                padding="xl"
                component={Link}
                to={`${item.nameColor}`}
                style={{ minHeight: "305px" }}
              >
                <Card.Section>
                  <Image src={item.photo.foto} height={160} alt="No way!" />
                </Card.Section>

                <Text mt="xs" color="dimmed" size="sm">
                  {item.colorPrice} руб
                </Text>

                <Text weight={500} size="lg" mt="xs">
                  {item.nameColor}
                </Text>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
      <Grid mt="lg">
        <Grid.Col md={6}>
          <Stack>
            <Text>Позиция в каталоге: {position}</Text>
            <Text>Название коллекции: {name}</Text>
            <Text>Класс истирания: {abrasionClass}</Text>
            <Text>Упаковка: {amountPackage}</Text>
            <Text>Фаска: {chamfer}</Text>
            <Text>Класс нагрузки: {loadClass}</Text>
            <Text>Замок: {lock}</Text>
            <Text>Размер панелей: {panelSize} мм</Text>
            <Text>ID: {uuid}</Text>
            <Text>Толщина: {thickness} мм</Text>
            <Text>
              Совместимость с теплым полом: {warmFloor ? "да" : "нет"}
            </Text>
            <Text>Гарантийный срок: {warrantyPeriod}</Text>
            <Text>Водонепроницаемость: {waterResistance ? "да" : "нет"}</Text>
            <Text>Страна производитель: {country}</Text>
            <Stack>
              <Title order={5}>
                Преимущества коллекции {name} от производителя {collection}:
              </Title>
              <Text>{advantages}</Text>
            </Stack>
          </Stack>
        </Grid.Col>
        <Grid.Col md={6}>
          <Stack>
            <Image fit="contain" height={300} src={image} />
            <Stack>
              <Title order={5}>
                Описание коллекции {name} от производителя {collection}:
              </Title>
              <Text>{description}</Text>
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
};
export default CollectionAdmin;
