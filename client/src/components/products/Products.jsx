import { Alert} from "antd";
import Product from "./Product";


const Products = ({filteredProducts}) => {


  return ( 
    <div className="grid grid-cols-card gap-4 m-4 md:m-0">
      {filteredProducts.length === 0 ? (
        <div className="p-2 w-[200px]">
          <Alert message="Product not found" type="warning" showIcon />
        </div>
      ) : (
        filteredProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))
      )}
    </div>
  );
};

export default Products;
