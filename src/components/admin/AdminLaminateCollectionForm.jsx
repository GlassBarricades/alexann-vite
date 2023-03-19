import { useState } from "react";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update } from "firebase/database";
import {
  TextInput,
  Textarea,
  Checkbox,
  Grid,
  Group,
  Button,
} from "@mantine/core";

const AdminLaminateCollectionForm = ({ collection, close }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [loadClass, setLoadClass] = useState("");
  const [thickness, setThickness] = useState("");
  const [abrasionClass, setAbrasionClass] = useState("");
  const [panelSize, setPanelSize] = useState("");
  const [amountPackage, setAmountPackage] = useState("");
  const [chamfer, setChamfer] = useState("");
  const [lock, setLock] = useState("");
  const [waterResistance, setWaterResistance] = useState(false);
  const [warmFloor, setWarmFloor] = useState(false);
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");

  const writeToDatabase = (e) => {
    e.preventDefault();
    const uuid = uid();
    set(ref(db, `/laminate/${collection}/collection/${name}`), {
      name,
      position,
      description,
      advantages,
      loadClass,
      thickness,
      abrasionClass,
      panelSize,
      amountPackage,
      chamfer,
      lock,
      waterResistance,
      warmFloor,
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
    setAbrasionClass("");
    setPanelSize("");
    setAmountPackage("");
    setChamfer("");
    setLock("");
    setWaterResistance("");
    setWarmFloor("");
    setWarrantyPeriod("");
    setCountry("");
    setImage("");
    close();
  };
  return (
    <form id="driver-form" onSubmit={writeToDatabase}>
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
            label="Класс истирания"
            placeholder="Класс истирания"
            value={abrasionClass}
            onChange={(e) => setAbrasionClass(e.target.value)}
          />
          <TextInput
            label="Размер панели"
            placeholder="Размер панели"
            value={panelSize}
            onChange={(e) => setPanelSize(e.target.value)}
          />
          <TextInput
            label="Количество в упаковке"
            placeholder="Количество в упаковке"
            value={amountPackage}
            onChange={(e) => setAmountPackage(e.target.value)}
          />
          <TextInput
            label="Фаска"
            placeholder="Фаска"
            value={chamfer}
            onChange={(e) => setChamfer(e.target.value)}
          />
          <TextInput
            label="Замок"
            placeholder="Замок"
            value={lock}
            onChange={(e) => setLock(e.target.value)}
          />
          <Group mt="sm">
            <Checkbox
              size="md"
              label="Водостойкость"
              checked={waterResistance}
              onChange={(event) =>
                setWaterResistance(event.currentTarget.checked)
              }
            />
            <Checkbox
              size="md"
              label="Совместимость с теплым полом"
              checked={warmFloor}
              onChange={(event) => setWarmFloor(event.currentTarget.checked)}
            />
          </Group>
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
export default AdminLaminateCollectionForm;
