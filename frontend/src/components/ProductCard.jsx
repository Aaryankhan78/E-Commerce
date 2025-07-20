import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { Heart } from "lucide-react";
import useWishlistStore from "../store/wishlistStore";

const ProductCard = ({ product, view }) => {
  const wishlist = useWishlistStore((state) => state.wishlist);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition 
        bg-white dark:bg-zinc-900 dark:text-white relative ${
          view === "list" ? "flex" : ""
        }`}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className={`object-cover ${view === "list" ? "w-40 h-40" : "w-full h-56"}`}
      />

      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {formatPrice(product.price)}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="inline-block mt-2 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          View Details
        </Link>
      </div>

      <button
        onClick={toggleWishlist}
        className="absolute top-3 right-3 p-1 rounded-full bg-white dark:bg-zinc-800 hover:scale-105 transition"
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart
          size={20}
          className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>
    </div>
  );
};

export default ProductCard;
