import { Title, SimpleGrid } from "@mantine/core";

const CatalogLayout = ({ title, children }) => {
    return (
        <>
            <Title align="center" mb="xl">{title}</Title>
            <SimpleGrid
                cols={5}
                spacing="xl"
                breakpoints={[
                    { maxWidth: "xl", cols: 5, spacing: "lg" },
                    { maxWidth: "lg", cols: 4, spacing: "lg" },
                    { maxWidth: "md", cols: 3, spacing: "md" },
                    { maxWidth: "sm", cols: 2, spacing: "sm" },
                    { maxWidth: "xs", cols: 2, spacing: "sm" },
                ]}
            >
                {children}
            </SimpleGrid>
        </>
    )
}
export default CatalogLayout;