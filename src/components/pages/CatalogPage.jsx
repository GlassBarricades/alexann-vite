import CatalogCard from "../catalog/CatalogCard";
import CatalogLayout from "../catalog/CatalogLayout";

const CatalogPage = ({ dataCategory }) => {

  const items = dataCategory.map((item, index) => {
    return (
      <CatalogCard key={index} item={item} />
    );
  })

  return (
    <CatalogLayout title={"Каталог"}>
      {items}
    </CatalogLayout>
  );
};
export default CatalogPage;
