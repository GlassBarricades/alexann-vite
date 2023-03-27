import { useState } from "react";
import {
  Title,
  Button,
  Modal,
  Text,
  Card,
  Image,
  Grid,
  Group,
  Badge,
  TextInput,
  Textarea,
  NumberInput,
  ActionIcon,
  Checkbox,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { uid } from "uid";
import { ref, update, remove } from "firebase/database";
import { Pencil, Trash, Eye, EyeOff } from "tabler-icons-react";
import useSortData from "../../hooks/useSortData";

const AdminMaterialDoors = ({ writeToDatabase }) => {
  const colorScheme = useMantineColorScheme();
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetStateVendors(),
  });
  const [laminateVendors] = useFetchData(`/interior-doors/`);
  const [name, setName] = useState("");
  const [position, setPosition] = useState(0);
  const [image, setImage] = useState("");
  const [visible, setVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [value, toggle] = useToggle([true, false]);

  const vendorsSorted = useSortData(laminateVendors, "position");

  const handleDelete = (item, base) => {
    remove(ref(db, `/${base}/${item.name}`));
  };

  const resetStateVendors = () => {
    setPosition(0);
    setName("");
    setImage("");
    setVisible(false);
    setDescription("");
  };

  const handleEdit = (vendor) => {
    setIsEdit(true);
    setPosition(vendor.position);
    setName(vendor.name);
    setImage(vendor.image);
    setVisible(vendor.visible);
    setDescription(vendor.description);
    handlers.open();
  };
  const handleEditVisible = (vendor) => {
    toggle();
    const handleSubmitChangeVisible = () => {
      update(ref(db, `/interior-doors/${vendor.name}`), {
        visible: value,
      });
    };
    handleSubmitChangeVisible();
  };

  const handleSubmitChange = () => {
    update(ref(db, `/interior-doors/${name}`), {
      name,
      position,
      image,
      visible,
      description,
    });

    resetStateVendors();
    handlers.close();
    setIsEdit(false);
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={handlers.close}
        size="xl"
        centered
        title="Добавление производителя"
      >
        <form
          id="driver-form"
          onSubmit={writeToDatabase(
            `/interior-doors/${name}`,
            {
              name: name,
              position: position,
              image: image,
              visible: visible,
              description: description,
              uuid: uid(),
            },
            resetStateVendors,
            handlers.close
          )}
        >
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
          <TextInput
            label="Картинка"
            placeholder="Картинка"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
          <Checkbox
            mt="xs"
            size="md"
            label="Скрыть"
            checked={visible}
            onChange={(event) => setVisible(event.currentTarget.checked)}
          />
          <Textarea
            placeholder="Описание производителя"
            label="Описание производителя"
            autosize
            minRows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {isEdit ? (
            <Button onClick={handleSubmitChange}>Изменить</Button>
          ) : (
            <Button mt="md" type="submit">
              Отправить
            </Button>
          )}
        </form>
      </Modal>
      <Group position="apart">
        <Title order={2}>Материалы отделки</Title>
        <Button onClick={handlers.open} variant="default">
          Добавить материал
        </Button>
      </Group>
      <Grid mt="lg">
        {vendorsSorted.map((item, index) => {
          return (
            <Grid.Col sm={6} xs={12} md={4} lg={3} xl={2} key={index}>
              <Card shadow="sm" component={Link} to={item.name}>
                <Card.Section>
                  <Image
                    padding="xs"
                    src={item.image}
                    height={160}
                    alt={item.name}
                  />
                </Card.Section>

                <Group position="apart" align="end">
                  <Text weight={500} size="lg" mt="md">
                    {item.name}
                  </Text>
                  <Badge
                    color={
                      colorScheme.colorScheme === "dark" ? "yellow.5" : "dark"
                    }
                    variant="outline"
                    align="center"
                  >
                    {item.position}
                  </Badge>
                </Group>
              </Card>
              <Group>
                <ActionIcon
                  mt="xs"
                  variant={
                    colorScheme.colorScheme === "dark" ? "outline" : "default"
                  }
                  onClick={() => handleEdit(item)}
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
                  onClick={() => handleDelete(item, vendors)}
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
export default AdminMaterialDoors;
