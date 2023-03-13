import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Stack,
  Text,
  Title,
  Button,
  Modal,
  TextInput,
  Anchor,
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
  const { color, collection } = useParams();
  const [nameColor, setNameColor] = useState("");
  const [vendorCodeColor, setVendorCodeColor] = useState("");
  const [collectionData] = useFetchDataOne(
    `/laminate/${collection}/collection/${color}`
  );
  const [colorsData] = useFetchData(
    `/laminate/${collection}/collection/${color}/colors/`
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
  } = collectionData;

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
        vendorCodeColor,
        uuid,
      }
    );

    setNameColor("");
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
            label="Артикул"
            placeholder="Артикул"
            value={vendorCodeColor}
            onChange={(e) => setVendorCodeColor(e.target.value)}
          />
          <Button mt="md" type="submit">
            Создать
          </Button>
        </form>
      </Modal>
      <Title>{color}</Title>
      <Button onClick={open} variant="default">
        Добавить цвет
      </Button>
      <Stack>
        {colorsData.map((item) => {
          return (
            <Anchor component={Link} to={`${item.nameColor}`} key={item.uuid}>
              {item.nameColor}
            </Anchor>
          );
        })}
      </Stack>
      <Stack>
        <Text>{position}</Text>
        <Text>{name}</Text>
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
    </>
  );
};
export default CollectionAdmin;
