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
import VendorPage from "./components/catalog/VendorPage";
import CollectionPage from "./components/catalog/CollectionPage";
import ColorPage from "./components/catalog/ColorPage";

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
    {
      name: "Ламинат",
      link: "laminate",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/laminate%2Flaminate.jpg?alt=media&token=8d8cd9a4-0ac6-4cba-b050-6b2f429c3df4",
    },
    {
      name: "Линолеум",
      link: "linoleum",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/linoleum%2Flinoleum.jpg?alt=media&token=f869e028-e0d2-4418-ae5a-ffa9500e3e72",
    },
    {
      name: "Виниловое покрытие",
      link: "vinyl-flooring",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/vinyl-flooring%2Fvinyl-flooring.jpg?alt=media&token=ef24ed31-33bb-4a15-8d26-31d7d4208c30",
    },
    {
      name: "Межкомнатные двери",
      link: "interior-doors",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/interior-doors%2Finterior-doors.jpg?alt=media&token=0e69d501-7eed-45ff-84a8-3b3647f4d1e6",
    },
    {
      name: "Входные двери",
      link: "entrance-doors",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/entrance-doors%2Fentrance-doors.png?alt=media&token=27b9e047-e724-4717-9741-abf776e94a8b",
    },
    {
      name: "Водосточная система",
      link: "drainage-system",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/drainage-system%2Fdrainage-system.jpg?alt=media&token=4b88234a-353f-469a-a4df-d5c59065169a",
    },
    {
      name: "Сайдинг",
      link: "siding",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/siding%2Fsiding.jpeg?alt=media&token=70604ed3-0d44-4717-a2a8-aa3f9b38abe2",
    },
    {
      name: "Ковровое покрытия",
      link: "carpet-covering",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/carpet-covering%2Fcarpet-covering.png?alt=media&token=0e74bc9c-aadf-4f50-87fe-ba53ec335bad",
    },
    {
      name: "Панели ПВХ",
      link: "pvc-panels",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/pvc-panels%2Fpvc-panels.jpg?alt=media&token=7e0bf495-81c0-4e5b-a1a8-710c15f4aa5a",
    },
    {
      name: "Панели МДФ",
      link: "mdf-panels",
      image:
        "https://firebasestorage.googleapis.com/v0/b/alexann-17cd1.appspot.com/o/mdf-panels%2Fmdf-panels.jpg?alt=media&token=eea7f6e1-532a-433b-9a83-0527f84f95a4",
    },
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
            path="catalog/"
            element={<CatalogPage dataCategory={dataCategory} />}
          />
          <Route
            path="catalog/:category"
            element={<CatalogGrid dataCategory={dataCategory} />}
          />
          <Route path="catalog/:category/:vendor" element={<VendorPage />} />
          <Route
            path="catalog/:category/:vendor/:collection"
            element={<CollectionPage />}
          />
          <Route
            path="catalog/:category/:vendor/:collection/:color"
            element={<ColorPage />}
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
