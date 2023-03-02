import { HeaderSimple } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { ContactsPage } from "./components/pages/ContactsPage";
import ServicesPage from "./components/pages/ServicesPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import CatalogPage from "./components/pages/CatalogPage";
import DeliveryPage from "./components/pages/DeliveryPage";

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
      link: "/services",
      label: "Услуги",
    },
    {
      link: "/delivery",
      label: "Доставка",
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
