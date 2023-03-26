import { Modal, Group, Button, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AdminGridCards from "./AdminGridCards";
const AdminCollectionContainer = ({
  data,
  editHandler,
  deleteHandler,
  visibleHandler,
  resetState,
  vendors,
  collection,
  children,
}) => {
  const [opened, handlers] = useDisclosure(false, {
    onClose: () => resetState(),
  });
  return (
    <>
      <Modal
        opened={opened}
        onClose={handlers.close}
        size="100%"
        centered
        title={`Добавить коллекцию ${collection}`}
      >
        {children}
      </Modal>
      <Group position="apart">
        <Title order={3}>{collection}</Title>
        <Button onClick={handlers.open} variant="default">
          Добавить коллекцию
        </Button>
      </Group>
      <AdminGridCards
        data={data}
        editHandlerGrid={editHandler}
        deleteHandler={deleteHandler}
        visibleHandler={visibleHandler}
        vendors={vendors}
        collection={collection}
      />
    </>
  );
};
export default AdminCollectionContainer;
