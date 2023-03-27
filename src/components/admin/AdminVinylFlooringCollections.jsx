import { useState } from "react";
import {
  Button,
  Grid,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { db } from "../../firebase";
import { uid } from "uid";
import { ref, update, remove } from "firebase/database";
import useFetchData from "../../hooks/useFetchData";
import useSortData from "../../hooks/useSortData";
import AdminCollectionContainer from "./AdminCollectionContainer";

const AdminVinylFlooringCollections = ({ writeToDatabase, handleDelete }) => {
  const { collection } = useParams();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  const [name, setName] = useState("");
  const [position, setPosition] = useState(0);
  const [vendorCode, setVendorCode] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [loadClass, setLoadClass] = useState("");
  const [thickness, setThickness] = useState(0);
  const [protectiveLayerThickness, setProtectiveLayerThickness] = useState(0);
  const [layingMethod, setLayingMethod] = useState("");
  const [texture, setTexture] = useState("");
  const [chamfer, setChamfer] = useState("");
  const [warmFloor, setWarmFloor] = useState(false);
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [collectionPrice, setCollectionPrice] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [value, toggle] = useToggle([true, false]);
  const [vinylFlooringCollection] = useFetchData(
    `/vinyl-flooring/${collection}/collection`
  );
  const sortedCollection = useSortData(vinylFlooringCollection, "position");

  const resetState = () => {
    setPosition(0);
    setName("");
    setDescription("");
    setAdvantages("");
    setLoadClass("");
    setThickness(0);
    setProtectiveLayerThickness(0);
    setLayingMethod("");
    setTexture("");
    setChamfer("");
    setWarmFloor(false);
    setCountry("");
    setImage("");
    setVisible(false);
    setCollectionPrice(0);
  };

  const handleEditVisible = (vendor) => {
    toggle();
    const handleSubmitChangeVisible = () => {
      update(
        ref(db, `/vinyl-flooring/${collection}/collection/${vendor.name}`),
        {
          visible: value,
        }
      );
    };
    handleSubmitChangeVisible();
  };

  const handleSubmitChangeVinylFlooring = () => {
    update(ref(db, `/vinyl-flooring/${collection}/collection/${name}`), {
      name,
      position,
      description,
      advantages,
      loadClass,
      thickness,
      protectiveLayerThickness,
      layingMethod,
      texture,
      chamfer,
      warmFloor,
      country,
      image,
      visible,
      collectionPrice,
    });

    resetState();
    handlers.close();
    setIsEdit(false);
  };
  const handleEditVinylFlooring = (vendor) => {
    setIsEdit(true);
    setPosition(vendor.position);
    setName(vendor.name);
    setDescription(vendor.description);
    setAdvantages(vendor.advantages);
    setLoadClass(vendor.loadClass);
    setThickness(vendor.thickness);
    setProtectiveLayerThickness(vendor.setProtectiveLayerThickness);
    setLayingMethod(vendor.layingMethod);
    setTexture(vendor.texture);
    setChamfer(vendor.chamfer);
    setWarmFloor(vendor.warmFloor);
    setCountry(vendor.country);
    setImage(vendor.image);
    setVisible(vendor.visible);
    setCollectionPrice(vendor.collectionPrice);
    handlers.open();
  };

  return (
    <>
      <AdminCollectionContainer
        data={sortedCollection}
        editHandler={handleEditVinylFlooring}
        deleteHandler={handleDelete}
        visibleHandler={handleEditVisible}
        vendors={"vinyl-flooring"}
        collection={collection}
        opened={opened}
        close={handlers.close}
        open={handlers.open}
      >
        <form
          onSubmit={writeToDatabase(
            `/vinyl-flooring/${collection}/collection/${name}`,
            {
              name: name,
              position: position,
              description: description,
              advantages: advantages,
              loadClass: loadClass,
              thickness: thickness,
              protectiveLayerThickness: protectiveLayerThickness,
              layingMethod: layingMethod,
              texture: texture,
              chamfer: chamfer,
              warmFloor: warmFloor,
              country: country,
              image: image,
              visible: visible,
              collectionPrice: collectionPrice,
              uuid: uid(),
            },
            resetState,
            handlers.close
          )}
        >
          <Grid>
            <Grid.Col md={6}>
              <NumberInput
                placeholder="Позиция в каталоге"
                label="Позиция в каталоге"
                value={position}
                onChange={setPosition}
              />
              <TextInput
                label="Название"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <NumberInput
                placeholder="Цена"
                label="Цена"
                value={collectionPrice}
                onChange={setCollectionPrice}
              />
              <TextInput
                label="Артикул"
                placeholder="Артикул"
                value={vendorCode}
                onChange={(e) => setVendorCode(e.target.value)}
              />
              <NumberInput
                precision={2}
                label="Толщина защитного слоя"
                placeholder="Толщина защитного слоя"
                value={protectiveLayerThickness}
                onChange={(e) => setProtectiveLayerThickness(e.target.value)}
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
                label="Фаска"
                placeholder="Фаска"
                value={chamfer}
                onChange={(e) => setChamfer(e.target.value)}
              />
              <NumberInput
                precision={2}
                placeholder="Толщина"
                label="Толщина"
                value={thickness}
                onChange={setThickness}
              />
              <TextInput
                placeholder="Способ укладки"
                label="Способ укладки"
                value={layingMethod}
                onChange={(e) => setLayingMethod(e.target.value)}
              />
              <TextInput
                placeholder="Текстура"
                label="Текстура"
                value={texture}
                onChange={(e) => setTexture(e.target.value)}
              />
              <Group mt="sm">
                <Checkbox
                  size="md"
                  label="Совместимость с теплым полом"
                  checked={warmFloor}
                  onChange={(event) =>
                    setWarmFloor(event.currentTarget.checked)
                  }
                />
                <Checkbox
                  size="md"
                  label="Скрыть"
                  checked={visible}
                  onChange={(event) => setVisible(event.currentTarget.checked)}
                />
              </Group>
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
          {isEdit ? (
            <Button onClick={handleSubmitChangeVinylFlooring}>Изменить</Button>
          ) : (
            <Button mt="md" type="submit">
              Отправить
            </Button>
          )}
        </form>
      </AdminCollectionContainer>
    </>
  );
};
export default AdminVinylFlooringCollections;
