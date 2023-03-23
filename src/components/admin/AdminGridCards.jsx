import {
  Grid,
  Card,
  Image,
  Badge,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { Pencil, Trash, Eye, EyeOff } from "tabler-icons-react";

const AdminGridCards = ({
  data,
  editHandler,
  deleteHandler,
  visibleHandler,
  vendors,
  collection,
}) => {
  const colorScheme = useMantineColorScheme();
  return (
    <Grid mt="lg">
      {data.map((item, index) => {
        return (
          <Grid.Col sm={6} xs={12} md={4} lg={3} xl={2} key={index}>
            <Card shadow="sm" padding="xs" component={Link} to={item.name}>
              <Card.Section>
                <Image src={item.image} height={160} alt={item.name} />
              </Card.Section>

              <Text mt="xs" color="dimmed" size="sm">
                {item.collectionPrice} руб
              </Text>

              <Group position="apart" align="end">
                <Text weight={500} size="md" mt="md">
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
                onClick={() => editHandler(item)}
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
                onClick={() =>
                  deleteHandler(
                    `/${vendors}/${collection}/collection/${item.name}`
                  )
                }
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
                onClick={() => visibleHandler(item)}
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
  );
};
export default AdminGridCards;
