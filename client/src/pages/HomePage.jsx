import Menu from "../components/menu/Menu";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import Cart from "../components/cart/Cart";

const HomePage = () => {

  return (
    <>
        <div className="home  flex md:flex-row flex-col justify-between gap-5">
          <div className=" bg-gray-900 md:h-[100vh]">
            <div className="menu overflow-auto max-h-[90vh] px-2 md:mt-6 mx-4 md:mx-0">
              <Menu />
            </div>
          </div>

          <div className="cart min-w-[300px] max-h-[calc(100vh-80px)] overflow-y-auto  mt-10">
            <Cart />
          </div>

          <div className="products border p-6 flex-[7] max-h-[calc(100vh-80px)] min-w-[220px] overflow-y-auto mx-4 md:mx-0 mt-10">
            <Products />
          </div>

          <div
            className="categories min-w-[150px] overflow-auto max-h-[calc(100vh-80px)]
              mx-4 md:mx-0 md:mt-10 md:mr-5 border mb-6"
          >
            <Categories />
          </div>
        </div>
    </>
  );
};

export default HomePage;
