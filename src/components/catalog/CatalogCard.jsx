import { Link } from "react-router-dom";
import { Card, Image, Text } from "@mantine/core";

const CatalogCard = ({item}) => {
    return (
        <Card
            shadow="sm"
            padding="xl"
            radius="xs"
            component={Link}
            to={item.link}
            style={{ minHeight: "330px" }}
        >
            <Card.Section>
                <Image src={item.image} height={260} alt={item.link} />
            </Card.Section>

            <Text weight={500} size="lg" mt="xs">
                {item.name}
            </Text>
        </Card>
    )
}
export default CatalogCard;