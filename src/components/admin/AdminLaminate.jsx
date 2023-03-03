import { useState } from "react";
import {
  Title,
  Button,
  Modal,
  TextInput,
  Textarea,
  Text,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import useFetchData from "../../hooks/useFetchData";

const AdminLaminate = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");

  const [laminateVendors] = useFetchData(`/laminate/`);

  console.log(laminateVendors);

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/laminate/${name}`), {
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
        title="Добавление производителя ламината"
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
            placeholder="Описание производителя"
            label="Описание производителя"
            autosize
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            placeholder="Преимущества производителя"
            label="Преимущества производителя"
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
      <Title order={3}>Производители</Title>
      <Button onClick={open} variant="default">
        Добавить производителя
      </Button>
      {laminateVendors.map((item, index) => {
        return (
          <Stack key={index}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.advantages}</Text>
          </Stack>
        );
      })}
    </>
  );
};
export default AdminLaminate;
