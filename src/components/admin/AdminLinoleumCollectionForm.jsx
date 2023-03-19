import { useState } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import { TextInput, Textarea, Grid, Button } from "@mantine/core";

const AdminLinoleumCollectionForm = ({ collection, close }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [loadClass, setLoadClass] = useState("");
  const [thickness, setThickness] = useState("");
  const [basis, setBasis] = useState("");
  const [protectiveLayerThickness, setProtectiveLayerThickness] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/linoleum/${collection}/collection/${name}`), {
      name,
      position,
      description,
      advantages,
      loadClass,
      thickness,
      basis,
      protectiveLayerThickness,
      warrantyPeriod,
      country,
      image,
      uuid,
    });

    setPosition("");
    setName("");
    setDescription("");
    setAdvantages("");
    setLoadClass("");
    setThickness("");
    setBasis("");
    setProtectiveLayerThickness("");
    setWarrantyPeriod("");
    setCountry("");
    setImage("");
    close();
  };
  return (
    <form onSubmit={writeToDatabase}>
      <Grid>
        <Grid.Col md={6}>
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
            label="Артикул"
            placeholder="Артикул"
            value={vendorCode}
            onChange={(e) => setVendorCode(e.target.value)}
          />
          <Textarea
            placeholder="Описание коллекции"
            label="Описание коллекции"
            autosize
            minRows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Textarea
            placeholder="Преимущества коллекции"
            label="Преимущества коллекции"
            autosize
            minRows={5}
            value={advantages}
            onChange={(e) => setAdvantages(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col md={6}>
          <TextInput
            label="Класс нагрузки"
            placeholder="Класс нагрузки"
            value={loadClass}
            onChange={(e) => setLoadClass(e.target.value)}
          />
          <TextInput
            label="Толщина"
            placeholder="Толщина"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
          />
          <TextInput
            label="Основа"
            placeholder="Основа"
            value={basis}
            onChange={(e) => setBasis(e.target.value)}
          />
          <TextInput
            label="Толщина защитного слоя"
            placeholder="Толщина защитного слоя"
            value={protectiveLayerThickness}
            onChange={(e) => setProtectiveLayerThickness(e.target.value)}
          />
          <TextInput
            label="Гарантийный срок службы"
            placeholder="Гарантийный срок службы"
            value={warrantyPeriod}
            onChange={(e) => setWarrantyPeriod(e.target.value)}
          />
          <TextInput
            label="Страна производитель"
            placeholder="Страна производитель"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Grid.Col>
      </Grid>
      <Button mt="md" type="submit">
        Создать
      </Button>
    </form>
  );
};
export default AdminLinoleumCollectionForm;
