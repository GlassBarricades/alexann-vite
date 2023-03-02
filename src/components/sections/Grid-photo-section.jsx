import { Container, Grid, SimpleGrid, useMantineTheme, Image, Title } from '@mantine/core';

const PRIMARY_COL_HEIGHT = 300;

const GridPhotoSection = () => {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.md / 2;

  return (
    <Container my="md">
        <Title align='center' mb="md">Наш магазин</Title>
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      <Image src={"https://lh3.googleusercontent.com/p/AF1QipPY-bwxmf_GuH9NYWmPP86I132g3jk5S7-C1UnV=s680-w680-h510"} height={PRIMARY_COL_HEIGHT} radius="md"/>
        <Grid gutter="md">
          <Grid.Col>
            <Image src={"https://lh3.googleusercontent.com/p/AF1QipMZ7eeLL4xstcuyBeiQ-SHPWjx3lF6JqS5dIJLN=s680-w680-h510"} height={SECONDARY_COL_HEIGHT} radius="md"/>
          </Grid.Col>
          <Grid.Col span={6}>
          <Image src={"https://sun9-69.vkuserphoto.ru/impg/AVE3b6-6xN-fx2H9UR502UVFWiB47ClMjIXVyQ/o6-G7Josrzc.jpg?size=2560x1439&quality=95&sign=76d0a07bab8c33a2649909ad2ed764ab&type=album"} height={SECONDARY_COL_HEIGHT} radius="md"/>
          </Grid.Col>
          <Grid.Col span={6}>
          <Image src={"https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/g8QD3Y2pHsU.jpg?alt=media&token=0bc5e791-4568-4cc0-bf8a-ae2ecbb237a0"} height={SECONDARY_COL_HEIGHT} radius="md"/>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
export default GridPhotoSection;