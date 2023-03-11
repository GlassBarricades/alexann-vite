import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Anchor,
  Image,
  Drawer,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ThemeChange } from "./Theme-change";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

export function HeaderSimple({ links }) {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Anchor
      component={Link}
      to={link.link}
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Image
          src={"https://aleksann.by/wp-content/themes/oceanic/images/logo.png"}
          width={130}
        />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ThemeChange />
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
      <Drawer opened={opened} onClose={close} title="Меню">
        123
      </Drawer>
    </Header>
  );
}
