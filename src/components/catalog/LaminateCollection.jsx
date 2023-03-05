import { useState } from "react";
import { Button, Title, Modal, TextInput, Textarea } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import useFetchData from "../../hooks/useFetchData";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import { Link } from "react-router-dom";

const LaminateCollection = () => {
  const { collection } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [laminateCollection] = useFetchData(
    `/laminate/${collection}/collection`
  );

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/laminate/${collection}/collection/${name}`), {
      name,
      position,
      description,
      advantages,
      uuid,
    });

    setPosition("");
    setName("");
    setDescription("");
    setAdvantages("");
    close();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Добавить коллекцию ${collection}`}
      >
        <form id="driver-form" onSubmit={writeToDatabase}>
          <TextInput
            label="Позиция в каталоге"
            placeholder="Позиция в каталоге"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <TextInput
            label="Название"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Описание коллекции"
            label="Описание коллекции"
            autosize
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            placeholder="Преимущества коллекции"
            label="Преимущества коллекции"
            autosize
            minRows={3}
            value={advantages}
            onChange={(e) => setAdvantages(e.target.value)}
          />

          <Button mt="md" type="submit">
            Отправить
          </Button>
        </form>
      </Modal>
      <Title order={3}>{collection}</Title>
      <Button onClick={open} variant="default">
        Добавить коллекцию
      </Button>
      {laminateCollection.map((item, index) => {
        return (
          <Button component={Link} to={item.name} key={index}>
            {item.name}
          </Button>
        );
      })}
    </>
  );
};
export default LaminateCollection;
