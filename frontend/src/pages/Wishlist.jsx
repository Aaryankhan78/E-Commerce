// pages/Wishlist.jsx
import { Link } from "react-router-dom";
import useWishlistStore from "../store/wishlistStore";
import PageWrapper from "../components/PageWrapper";
import { formatPrice } from "../utils/formatPrice";
import { FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore();

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-semibold mb-1">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-indigo-600 font-semibold mb-2">
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="text-red-500 flex items-center gap-1 hover:underline text-sm"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Wishlist;
