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
  Image,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useFetchData from "../../hooks/useFetchData";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import { Link } from "react-router-dom";

const ColorAdmin = () => {
  const { colorName, collection, color } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [foto, setFoto] = useState("");
  const [fotoData] = useFetchData(
    `/laminate/${collection}/collection/${color}/colors/${colorName}/photo/`
  );

  const writeToDatabase = (e) => {
    e.preventDefault();
    set(
      ref(
        db,
        `/laminate/${collection}/collection/${color}/colors/${colorName}/photo/`
      ),
      {
        foto,
      }
    );

    setFoto("");
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title={`Добавить цвет ${color}`}>
        <form id="driver-form" onSubmit={writeToDatabase}>
          <TextInput
            label="Название"
            placeholder="Название"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            required
          />
          <Button mt="md" type="submit">
            Создать
          </Button>
        </form>
      </Modal>
      <Title>{`${colorName}`}</Title>
      <Button onClick={open} variant="default">
        Добавить фото
      </Button>
    {fotoData.map((item, index) => {
        return <Image key={index} src={item} />
    })}
    </>
  );
};
export default ColorAdmin;
