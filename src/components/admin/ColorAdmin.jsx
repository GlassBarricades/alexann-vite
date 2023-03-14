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
  const [foto2, setFoto2] = useState("");
  const [foto3, setFoto3] = useState("");
  const [fotoData] = useFetchData(
    `/laminate/${collection}/collection/${color}/colors/${colorName}/photo/`
  );
  console.log(fotoData)

  const writeToDatabase = (e) => {
    e.preventDefault();
    set(
      ref(
        db,
        `/laminate/${collection}/collection/${color}/colors/${colorName}/photo/`
      ),
      {
        foto,
        foto2,
        foto3
      }
    );

    setFoto("");
    setFoto2("");
    setFoto3("");
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title={`Добавить картинки ${colorName}`}>
        <form id="driver-form" onSubmit={writeToDatabase}>
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={foto2}
            onChange={(e) => setFoto2(e.target.value)}
          />
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={foto3}
            onChange={(e) => setFoto3(e.target.value)}
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
