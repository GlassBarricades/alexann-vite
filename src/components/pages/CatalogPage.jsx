import {
  Button,
  Container,
  Title,
  Box,
  BackgroundImage,
  Text,
  Center,
  Grid,
} from "@mantine/core";
import { Route, Routes, Link } from "react-router-dom";
import CatalogGrid from "../catalog/CatalogGrid";
import LaminateCatalog from "../catalog/LaminateCatalog";

const CatalogPage = ({ dataCategory }) => {
  return (
    <Container>
      <Title>Каталог</Title>
      <Grid mt="xl">
        {dataCategory.map((item, index) => {
          return (
            <Box
              key={index}
              mr="md"
              mb="md"
              maw={300}
              component={Link}
              to={item.link}
            >
              <BackgroundImage
                src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
                radius="sm"
              >
                <Center p="md">
                  <Text color="#fff">{item.name}</Text>
                </Center>
              </BackgroundImage>
            </Box>
          );
        })}
      </Grid>
    </Container>
  );
};
export default CatalogPage;
