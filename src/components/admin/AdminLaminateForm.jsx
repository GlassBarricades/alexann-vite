import { useState } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";

const AdminLaminateForm = ({ vendors, close }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/${vendors}/${name}`), {
      name,
      position,
      image,
      description,
      advantages,
      uuid,
    });

    setPosition("");
    setName("");
    setImage("");
    setDescription("");
    setAdvantages("");
    close();
  };
  return (
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
      <TextInput
        label="Картинка"
        placeholder="Картинка"
        value={image}
        onChange={(e) => setImage(e.target.value)}
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
  );
};
export default AdminLaminateForm;
