import CategoriesEdit from "../components/categories/CategoriesEdit";
import { CategoriesProvider } from "../contexts/CategoriesContext";

const CategoriesPage = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <CategoriesProvider>
        <CategoriesEdit />
      </CategoriesProvider>
    </div>
  );
};

export default CategoriesPage;
