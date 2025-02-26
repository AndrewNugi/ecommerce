import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="max-w-sm relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full transition-transform duration-300 hover:scale-105"
            src={p.image}
            alt={p.name}
            style={{ height: "200px", objectFit: "cover" }}
          />
        </Link>
        <div className="absolute top-3 left-3">
          <HeartIcon product={p} />
        </div>
      </section>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h5 className="text-lg font-semibold text-gray-800 line-clamp-2">{p?.name}</h5>
          <p className="text-pink-600 font-bold ml-2">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-4 text-gray-600 text-sm line-clamp-2">
          {p?.description?.substring(0, 80)} ...
        </p>

        <section className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition-colors duration-200 focus:ring-2 focus:outline-none focus:ring-pink-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-pink-600 transition-colors duration-200"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={22} />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;