import { HeaderSimple } from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import { ContactsPage } from "./components/pages/ContactsPage";
import ServicesPage from "./components/pages/ServicesPage";
import AboutUsPage from "./components/pages/AboutUsPage";
import CatalogPage from "./components/pages/CatalogPage";
import DeliveryPage from "./components/pages/DeliveryPage";
import CatalogGrid from "./components/catalog/CatalogGrid";
import AdminPage from "./components/pages/AdminPage";

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
    {
      link: "/admin/laminate",
      label: "Админка",
    },
  ];
  const dataCategory = [
    { name: "Ламинат", link: "laminate" },
    { name: "Линолеум", link: "linoleum" },
    { name: "Виниловое покрытие", link: "vinyl-flooring" },
    { name: "Межкомнатные двери", link: "interior-doors" },
    { name: "Входные двери", link: "entrance-doors" },
    { name: "Водосточная система", link: "drainage-system" },
    { name: "Сайдинг", link: "siding" },
    { name: "Ковровое покрытия", link: "carpet-covering" },
    { name: "Панели ПВХ", link: "pvc-panels" },
    { name: "Панели МДФ", link: "mdf-panels" },
  ];

  return (
    <BrowserRouter>
      <div className="App">
        <HeaderSimple links={links} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route
            path="catalog/*"
            element={<CatalogPage dataCategory={dataCategory} />}
          />
          <Route
            path="catalog/:category"
            element={<CatalogGrid dataCategory={dataCategory} />}
          />
          <Route path="delivery" element={<DeliveryPage />} />
          <Route
            path="admin/*"
            element={<AdminPage dataCategory={dataCategory} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
