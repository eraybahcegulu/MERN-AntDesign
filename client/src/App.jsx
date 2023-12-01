import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ProductsProvider } from "./contexts/ProductsContext";

function App() {
  return (
    <CategoriesProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </CategoriesProvider>
  );
}

export default App;
