import ProductsEdit from "../components/products/ProductsEdit";
import { CategoriesProvider } from "../contexts/CategoriesContext";
import { ProductsProvider } from "../contexts/ProductsContext";

const ProductsPage = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <CategoriesProvider>
        <ProductsProvider>
          <ProductsEdit />
        </ProductsProvider>
      </CategoriesProvider>
    </div>
  );
};

export default ProductsPage;
