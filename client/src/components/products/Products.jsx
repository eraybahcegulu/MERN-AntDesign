import { Image , Alert} from "antd";

const Products = ({products}) => {
  return (
    <div className="grid grid-cols-card gap-4 m-4 md:m-0">
      {products.length === 0 ? (
        <div className="p-2 w-[200px]">
          <Alert message="Product not found" type="warning" showIcon />
        </div>
      ) : (
        products.map((item) => (
          <div key={item._id} className="product-item border hover:shadow-md cursor-pointer transition-all select-none">
            <div className="product-img">
              <Image
                className="min-h-[175px] object-cover w-full border-b"
                src={item.image}
                alt=""
              />
            </div>
            <div className="text-center p-4 flex flex-col">
              <span className="overflow-hidden">
                {item.name}
              </span>
              <span>
                <strong>{item.price}$</strong>
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Products;
