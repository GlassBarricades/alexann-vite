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
  TextInput,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import { uid } from "uid";
import { set, ref, update, remove } from "firebase/database";
import { Pencil, Trash } from "tabler-icons-react";

const AdminLaminate = () => {
  const { vendors } = useParams();
  const [opened, { open, close }] = useDisclosure(false);
  const [laminateVendors] = useFetchData(`/${vendors}/`);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [advantages, setAdvantages] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleDelete = (item, base) => {
    remove(ref(db, `/${base}/${item.name}`));
  };

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
  const handleEdit = (vendor) => {
    setIsEdit(true);
    setPosition(vendor.position);
    setName(vendor.name);
    setImage(vendor.image);
    setDescription(vendor.description);
    setAdvantages(vendor.advantages);
    open();
  };

  const handleSubmitChange = () => {
    update(ref(db, `/${vendors}/${name}`), {
      name,
      position,
      image,
      description,
      advantages,
    });

    setPosition("");
    setName("");
    setImage("");
    setDescription("");
    setAdvantages("");
    close();
    setIsEdit(false);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        centered
        title="Добавление производителя"
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
        <Title order={2}>Производители</Title>
        <Button onClick={open} variant="default">
          Добавить производителя
        </Button>
      </Group>
      <Grid mt="lg">
        {laminateVendors.map((item, index) => {
          return (
            <Grid.Col sm={4} xs={6} md={3} lg={2} key={index}>
              <Card shadow="sm" padding="xl" component={Link} to={item.name}>
                <Card.Section p="md">
                  <Image
                    fit="contain"
                    src={item.image}
                    height={160}
                    alt={item.name}
                  />
                </Card.Section>

                <Text weight={500} size="lg" mt="md">
                  {item.name}
                </Text>
              </Card>
              <Group>
                <ActionIcon
                  mt="xs"
                  variant="default"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil size="1rem" />
                </ActionIcon>
                <ActionIcon
                  mt="xs"
                  variant="default"
                  onClick={() => handleDelete(item, vendors)}
                >
                  <Trash size="1rem" />
                </ActionIcon>
              </Group>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};
export default AdminLaminate;
