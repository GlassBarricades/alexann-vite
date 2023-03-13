import { Container, Title, Stack, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import useFetchDataOne from "../../hooks/useFetchDataOne";

const CollectionPage = () => {
    const {collection, category, vendor} = useParams();
    const [collectionData] = useFetchDataOne(`/${category}/${vendor}/collection/${collection}`);
    const {
        abrasionClass,
        advantages,
        amountPackage,
        chamfer,
        country,
        description,
        loadClass,
        lock,
        name,
        panelSize,
        position,
        thickness,
        uuid,
        warmFloor,
        warrantyPeriod,
        waterResistance,
      } = collectionData;
    return (
        <Container>
            <Title>{collection}</Title>
            <Stack>
        <Text>{position}</Text>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Text>{advantages}</Text>
        <Text>{abrasionClass}</Text>
        <Text>{amountPackage}</Text>
        <Text>{chamfer}</Text>
        <Text>{loadClass}</Text>
        <Text>{lock}</Text>
        <Text>{panelSize}</Text>
        <Text>{uuid}</Text>
        <Text>{thickness}</Text>
        <Text>{warmFloor}</Text>
        <Text>{warrantyPeriod}</Text>
        <Text>{waterResistance}</Text>
        <Text>{country}</Text>
      </Stack>
        </Container>
    )
}
export default CollectionPage;