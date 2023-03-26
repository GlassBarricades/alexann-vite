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

const AdminLaminateCollections = ({ writeToDatabase, handleDelete }) => {
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
  const [basis, setBasis] = useState("");
  const [protectiveLayerThickness, setProtectiveLayerThickness] = useState("");
  const [warmFloor, setWarmFloor] = useState(false);
  const [warrantyPeriod, setWarrantyPeriod] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [patternType, setPatternType] = useState("");
  const [collectionPrice, setCollectionPrice] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [value, toggle] = useToggle([true, false]);
  const [laminateCollection] = useFetchData(
    `/linoleum/${collection}/collection`
  );
  const sortedCollection = useSortData(laminateCollection, "position");

  const resetState = () => {
    setPosition(0);
    setName("");
    setDescription("");
    setAdvantages("");
    setLoadClass("");
    setThickness(0);
    setBasis("");
    setProtectiveLayerThickness("");
    setWarmFloor(false);
    setWarrantyPeriod("");
    setCountry("");
    setImage("");
    setVisible(false);
    setPatternType("");
    setCollectionPrice(0);
  };

  const handleEditVisible = (vendor) => {
    toggle();
    const handleSubmitChangeVisible = () => {
      update(ref(db, `/linoleum/${collection}/collection/${vendor.name}`), {
        visible: value,
      });
    };
    handleSubmitChangeVisible();
  };

  const handleSubmitChangeLaminate = () => {
    update(ref(db, `/linoleum/${collection}/collection/${name}`), {
      name,
      position,
      description,
      advantages,
      loadClass,
      thickness,
      basis,
      protectiveLayerThickness,
      warmFloor,
      warrantyPeriod,
      country,
      image,
      visible,
      patternType,
      collectionPrice,
    });

    resetState();
    handlers.close();
    setIsEdit(false);
  };
  const handleEditLaminate = (vendor) => {
    setIsEdit(true);
    setPosition(vendor.position);
    setName(vendor.name);
    setDescription(vendor.description);
    setAdvantages(vendor.advantages);
    setLoadClass(vendor.loadClass);
    setThickness(vendor.thickness);
    setBasis(vendor.basis);
    setProtectiveLayerThickness(vendor.protectiveLayerThickness);
    setWarmFloor(vendor.warmFloor);
    setWarrantyPeriod(vendor.warrantyPeriod);
    setCountry(vendor.country);
    setImage(vendor.image);
    setVisible(vendor.visible);
    setPatternType(vendor.patternType);
    setCollectionPrice(vendor.collectionPrice);
    handlers.open();
  };

  return (
    <>
      <AdminCollectionContainer
        data={sortedCollection}
        editHandler={handleEditLaminate}
        deleteHandler={handleDelete}
        visibleHandler={handleEditVisible}
        resetState={resetState}
        vendors={"linoleum"}
        collection={collection}
      >
        <form
          onSubmit={writeToDatabase(
            `/linoleum/${collection}/collection/${name}`,
            {
              name: name,
              position: position,
              description: description,
              advantages: advantages,
              loadClass: loadClass,
              thickness: thickness,
              basis: basis,
              protectiveLayerThickness: protectiveLayerThickness,
              warmFloor: warmFloor,
              warrantyPeriod: warrantyPeriod,
              country: country,
              image: image,
              visible: visible,
              patternType: patternType,
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
                label="Основа"
                placeholder="Основа"
                value={basis}
                onChange={(e) => setBasis(e.target.value)}
              />
              <NumberInput
                precision={2}
                label="Толщина защитного слоя"
                placeholder="Толщина защитного слоя"
                value={protectiveLayerThickness}
                onChange={(e) => setProtectiveLayerThickness(e.target.value)}
              />
              <TextInput
                label="Тип рисунка"
                placeholder="Тип рисунка"
                value={patternType}
                onChange={(e) => setPatternType(e.target.value)}
              />
              <NumberInput
                precision={2}
                placeholder="Толщина"
                label="Толщина"
                value={thickness}
                onChange={setThickness}
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
          {isEdit ? (
            <Button onClick={handleSubmitChangeLaminate}>Изменить</Button>
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
export default AdminLaminateCollections;
