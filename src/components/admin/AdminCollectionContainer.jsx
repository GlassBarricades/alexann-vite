import { Modal, Group, Button, Title } from "@mantine/core";
import AdminGridCards from "./AdminGridCards";
const AdminCollectionContainer = ({
  data,
  editHandler,
  deleteHandler,
  visibleHandler,
  vendors,
  collection,
  children,
  opened,
  close,
  open,
}) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="100%"
        centered
        title={`Добавить коллекцию ${collection}`}
      >
        {children}
      </Modal>
      <Group position="apart">
        <Title order={3}>{collection}</Title>
        <Button onClick={open} variant="default">
          Добавить коллекцию
        </Button>
      </Group>
      <AdminGridCards
        data={data}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        visibleHandler={visibleHandler}
        vendors={vendors}
        collection={collection}
      />
    </>
  );
};
export default AdminCollectionContainer;
