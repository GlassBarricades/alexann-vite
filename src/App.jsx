import { HeaderSimple } from "./components/Header";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "@mantine/core";
import HomePage from "./components/pages/HomePage";

function App() {
  const links = [
    {
      link: "/",
      label: "Главная",
    },
    {
      link: "/catalog",
      label: "Каталог",
    },
    {
      link: "/about-us",
      label: "О нас",
    },
    {
      link: "/contacts",
      label: "Контакты",
    },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderSimple links={links} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
