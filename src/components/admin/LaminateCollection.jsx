import { useState } from "react";
import {
  Button,
  Title,
  Modal,
  Grid,
  Group,
  Card,
  Image,
  Text,
  TextInput,
  Textarea,
  Checkbox,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update, remove } from "firebase/database";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { Pencil, Trash, Eye, EyeOff } from "tabler-icons-react";

const LaminateCollection = () => {
  const colorScheme = useMantineColorScheme();
  const { vendors, collection } = useParams();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetStateLaminate(),
  });
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
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [value, toggle] = useToggle([true, false]);
  const [laminateCollection] = useFetchData(
    `/${vendors}/${collection}/collection`
  );

  const resetStateLaminate = () => {
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
    setVisible(false);
  };

  const writeToDatabaseLaminate = (link, data) => (e) => {
    e.preventDefault();
    // const uuid = uid();
    set(ref(db, link), {
      ...data,
    });

    resetStateLaminate();
    handlers.close();
  };

  // const writeToDatabaseLaminate = (e) => {
  //   e.preventDefault();
  //   const uuid = uid();
  //   set(ref(db, `/${vendors}/${collection}/collection/${name}`), {
  //     name,
  //     position,
  //     description,
  //     advantages,
  //     loadClass,
  //     thickness,
  //     abrasionClass,
  //     panelSize,
  //     amountPackage,
  //     chamfer,
  //     lock,
  //     waterResistance,
  //     warmFloor,
  //     warrantyPeriod,
  //     country,
  //     image,
  //     visible,
  //     uuid,
  //   });

  //   resetStateLaminate();
  //   handlers.close();
  // };

  const handleDelete = (item) => {
    remove(ref(db, `/${vendors}/${collection}/collection/${item.name}`));
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
    });

    resetStateLaminate();
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
    handlers.open();
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
          onSubmit={writeToDatabaseLaminate(
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
              uuid: uid(),
            }
          )}
        >
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
                  onChange={(event) =>
                    setWarmFloor(event.currentTarget.checked)
                  }
                />
                <Checkbox
                  mt="xs"
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
      <Grid mt="lg">
        {laminateCollection.map((item, index) => {
          return (
            <Grid.Col sm={6} xs={12} md={4} lg={3} xl={2} key={index}>
              <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                <Card.Section>
                  <Image src={item.image} height={160} alt={item.name} />
                </Card.Section>

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
              </Card>
              <Group>
                <ActionIcon
                  mt="xs"
                  variant={
                    colorScheme.colorScheme === "dark" ? "outline" : "default"
                  }
                  onClick={() => handleEditLaminate(item)}
                  color={
                    colorScheme.colorScheme === "dark" ? "yellow.5" : undefined
                  }
                >
                  <Pencil size="1rem" />
                </ActionIcon>
                <ActionIcon
                  mt="xs"
                  variant={
                    colorScheme.colorScheme === "dark" ? "outline" : "default"
                  }
                  onClick={() => handleDelete(item)}
                  color={
                    colorScheme.colorScheme === "dark" ? "yellow.5" : undefined
                  }
                >
                  <Trash size="1rem" />
                </ActionIcon>
                <ActionIcon
                  mt="xs"
                  variant={
                    colorScheme.colorScheme === "dark" ? "outline" : "default"
                  }
                  onClick={() => handleEditVisible(item)}
                  color={
                    colorScheme.colorScheme === "dark" ? "yellow.5" : undefined
                  }
                >
                  {item.visible ? <EyeOff size="1rem" /> : <Eye size="1rem" />}
                </ActionIcon>
              </Group>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};
export default LaminateCollection;
