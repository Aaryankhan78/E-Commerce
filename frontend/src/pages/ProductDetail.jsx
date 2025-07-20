// pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCartStore } from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import { formatPrice } from "../utils/formatPrice";
import PageWrapper from "../components/PageWrapper";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isWishlisted = wishlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            <button
              onClick={() => {
                if (isWishlisted) {
                  removeFromWishlist(product.id);
                  toast.info("Removed from wishlist");
                } else {
                  addToWishlist(product);
                  toast.success("Added to wishlist");
                }
              }}
              className="text-red-500 text-2xl hover:scale-110 transition"
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          <p className="text-gray-500 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-indigo-600 mb-4">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={() => {
              addToCart(product);
              toast.success("Item added to cart!");
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
