import { useParams } from "react-router-dom";
import { useState } from "react";
import {
  Stack,
  Text,
  Title,
  Button,
  Modal,
  TextInput,
  Anchor,
  Image,
  Group,
  Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useFetchData from "../../hooks/useFetchData";

const ColorAdmin = () => {
  const { colorName, collection, color } = useParams();
  const [fotoData] = useFetchData(
    `/laminate/${collection}/collection/${color}/colors/${colorName}/photo/`
  );

  return (
    <>
      <Group position="apart">
        <Title>{`${colorName}`}</Title>
      </Group>
      <Grid mt="lg">
        {fotoData.map((item, index) => {
          return (
            <Grid.Col md={4} key={index}>
              {item !== "" ? <Image height={400} src={item} /> : undefined}
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};
export default ColorAdmin;
