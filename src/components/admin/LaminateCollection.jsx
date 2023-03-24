import { useState } from "react";
import {
  Button,
  Title,
  Modal,
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
import AdminGridCards from "./AdminGridCards";

const LaminateCollection = ({ writeToDatabase, handleDelete }) => {
  const { vendors, collection } = useParams();
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
  const [visible, setVisible] = useState(false);

  const [patternType, setPatternType] = useState("");

  const [collectionPrice, setCollectionPrice] = useState(0);

  const [antistatic, setAntistatic] = useState(false);
  const [formaldehydeEmissionClass, setFormaldehydeEmissionClass] =
    useState("");
  const [europeanNorms, setEuropeanNorms] = useState("");
  const [boardSurface, setBoardSurface] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  const [value, toggle] = useToggle([true, false]);
  const [laminateCollection] = useFetchData(
    `/${vendors}/${collection}/collection`
  );
  const sortedCollection = useSortData(laminateCollection, "position");

  const resetState = () => {
    if (vendors === "laminate") {
      setPosition(0);
      setName("");
      setDescription("");
      setAdvantages("");
      setLoadClass("");
      setThickness(0);
      setAbrasionClass("");
      setPanelSize("");
      setAmountPackage("");
      setChamfer("");
      setLock("");
      setWaterResistance(false);
      setWarmFloor(false);
      setWarrantyPeriod("");
      setCountry("");
      setImage("");
      setVisible(false);
      setPatternType("");
      setCollectionPrice(0);
      setAntistatic(false);
      setFormaldehydeEmissionClass("");
      setEuropeanNorms("");
      setBoardSurface("");
    } else if (vendors === "linoleum") {
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
    }
  };

  const handleEditVisible = (vendor) => {
    toggle();
    const handleSubmitChangeVisible = () => {
      update(ref(db, `/${vendors}/${collection}/collection/${vendor.name}`), {
        visible: value,
      });
    };
    handleSubmitChangeVisible();
  };

  const handleSubmitChangeLaminate = () => {
    if (vendors === "laminate") {
      update(ref(db, `/${vendors}/${collection}/collection/${name}`), {
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
        visible,
        patternType,
        collectionPrice,
        antistatic,
        formaldehydeEmissionClass,
        europeanNorms,
        boardSurface,
      });

      resetState();
      handlers.close();
      setIsEdit(false);
    } else if (vendors === "linoleum") {
      update(ref(db, `/${vendors}/${collection}/collection/${name}`), {
        name,
        position,
        description,
        advantages,
        loadClass,
        thickness,
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
    }
  };
  const handleEditLaminate = (vendor) => {
    if (vendors === "laminate") {
      setIsEdit(true);
      setPosition(vendor.position);
      setName(vendor.name);
      setDescription(vendor.description);
      setAdvantages(vendor.advantages);
      setLoadClass(vendor.loadClass);
      setThickness(vendor.thickness);
      setAbrasionClass(vendor.abrasionClass);
      setPanelSize(vendor.panelSize);
      setAmountPackage(vendor.amountPackage);
      setChamfer(vendor.chamfer);
      setLock(vendor.lock);
      setWaterResistance(vendor.waterResistance);
      setWarmFloor(vendor.warmFloor);
      setWarrantyPeriod(vendor.warrantyPeriod);
      setCountry(vendor.country);
      setImage(vendor.image);
      setVisible(vendor.visible);
      setPatternType(vendor.patternType);
      setCollectionPrice(vendor.collectionPrice);
      setAntistatic(vendor.antistatic);
      setFormaldehydeEmissionClass(vendor.formaldehydeEmissionClass);
      setEuropeanNorms(vendor.europeanNorms);
      setBoardSurface(vendor.boardSurface);
      handlers.open();
    } else if (vendors === "linoleum") {
      setIsEdit(true);
      setPosition(vendor.position);
      setName(vendor.name);
      setDescription(vendor.description);
      setAdvantages(vendor.advantages);
      setLoadClass(vendor.loadClass);
      setThickness(vendor.thickness);
      setWarmFloor(vendor.warmFloor);
      setWarrantyPeriod(vendor.warrantyPeriod);
      setCountry(vendor.country);
      setImage(vendor.image);
      setVisible(vendor.visible);
      setPatternType(vendor.patternType);
      setCollectionPrice(vendor.collectionPrice);
      handlers.open();
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handlers.close}
        size="100%"
        centered
        title={`Добавить коллекцию ${collection}`}
      >
        <form
          onSubmit={
            vendors === "laminate"
              ? writeToDatabase(
                  `/${vendors}/${collection}/collection/${name}`,
                  {
                    name: name,
                    position: position,
                    description: description,
                    advantages: advantages,
                    loadClass: loadClass,
                    thickness: thickness,
                    abrasionClass: abrasionClass,
                    panelSize: panelSize,
                    amountPackage: amountPackage,
                    chamfer: chamfer,
                    lock: lock,
                    waterResistance: waterResistance,
                    warmFloor: warmFloor,
                    warrantyPeriod: warrantyPeriod,
                    country: country,
                    image: image,
                    visible: visible,
                    patternType: patternType,
                    collectionPrice: collectionPrice,
                    antistatic: antistatic,
                    formaldehydeEmissionClass: formaldehydeEmissionClass,
                    europeanNorms: europeanNorms,
                    boardSurface: boardSurface,
                    uuid: uid(),
                  },
                  resetState,
                  handlers.close
                )
              : writeToDatabase(
                  `/${vendors}/${collection}/collection/${name}`,
                  {
                    name: name,
                    position: position,
                    description: description,
                    advantages: advantages,
                    loadClass: loadClass,
                    thickness: thickness,
                    warmFloor: warmFloor,
                    basis: basis,
                    protectiveLayerThickness: protectiveLayerThickness,
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
                )
          }
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
              {vendors === "laminate" ? (
                <>
                  <TextInput
                    label="Соответствие европейским нормам"
                    placeholder="Соответствие европейским нормам"
                    value={europeanNorms}
                    onChange={(e) => setEuropeanNorms(e.target.value)}
                  />
                  <TextInput
                    label="Поверхность доски"
                    placeholder="Поверхность доски"
                    value={boardSurface}
                    onChange={(e) => setBoardSurface(e.target.value)}
                  />
                  <TextInput
                    label="Класс эмиссии формальдегида"
                    placeholder="Класс эмиссии формальдегида"
                    value={formaldehydeEmissionClass}
                    onChange={(e) =>
                      setFormaldehydeEmissionClass(e.target.value)
                    }
                  />
                </>
              ) : undefined}
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
              <TextInput
                label="Толщина защитного слоя"
                placeholder="Толщина защитного слоя"
                value={protectiveLayerThickness}
                onChange={(e) => setProtectiveLayerThickness(e.target.value)}
              />
              {vendors === "laminate" ? (
                <>
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
                </>
              ) : undefined}

              <TextInput
                label="Тип рисунка"
                placeholder="Тип рисунка"
                value={patternType}
                onChange={(e) => setPatternType(e.target.value)}
              />
              <NumberInput
                placeholder="Толщина"
                label="Толщина"
                value={thickness}
                onChange={setThickness}
              />
              <Group mt="sm">
                {vendors === "laminate" ? (
                  <>
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
                      label="Антистатик"
                      checked={antistatic}
                      onChange={(event) =>
                        setAntistatic(event.currentTarget.checked)
                      }
                    />
                  </>
                ) : undefined}
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
      </Modal>
      <Group position="apart">
        <Title order={3}>{collection}</Title>
        <Button onClick={handlers.open} variant="default">
          Добавить коллекцию
        </Button>
      </Group>
      <AdminGridCards
        data={sortedCollection}
        editHandler={handleEditLaminate}
        deleteHandler={handleDelete}
        visibleHandler={handleEditVisible}
        vendors={vendors}
        collection={collection}
      />
    </>
  );
};
export default LaminateCollection;
