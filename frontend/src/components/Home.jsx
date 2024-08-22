import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart, getTotals } from "../slices/cartSlice";
import { useEffect } from "react";
import { productsFetch } from "../slices/productsSlice";
import { ordersFetch } from "../slices/orderSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(productsFetch());
    dispatch(getTotals());
    dispatch(ordersFetch())
  }, [])
  
  const { items: data, status } = useSelector((state) => state.products);
  console.log(data)
const orders=useSelector((store)=>store.order?.orders)
console.log("orders",orders)
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <img src={product.image} alt={product.name} />
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
