// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useCartStore } from "../store/cartStore";
import useWishlistStore from "../store/wishlistStore";
import { useRecommendationStore } from "../store/recommendationStore";

import { formatPrice } from "../utils/formatPrice";
import PageWrapper from "../components/PageWrapper";
import Recommendations from "../components/Recommendations";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const fallbackImage = "/fallback.jpg"; // Ensure this is in /public

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addViewedProduct } = useRecommendationStore();

  const isWishlisted = wishlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        addViewedProduct(data);
        fetchCategoryRecommendations(data);
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };

    const fetchCategoryRecommendations = async (currentProduct) => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${currentProduct.category}`
        );
        const data = await res.json();
        const filtered = data.products
          .filter((p) => p.id !== currentProduct.id)
          .slice(0, 4);
        setRecommended(filtered);
      } catch (err) {
        console.error("Category recommendation fetch failed", err);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchAIRecommendations = async () => {
    if (!product) return;

    try {
      setAiLoading(true);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      if (!backendUrl) {
        toast.error("Server URL not configured");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/ai/recommend`, {
        title: product.title,
        category: product.category,
        description: product.description,
      });

      const { recommendations } = response.data;

      if (Array.isArray(recommendations)) {
        setAiRecommendations(recommendations.slice(0, 4));
      } else {
        toast.error("AI returned invalid format");
      }
    } catch (err) {
      console.error("AI recommendation error:", err);
      toast.error("AI recommendations unavailable");
    } finally {
      setAiLoading(false);
    }
  };

  if (!product) return <p className="text-center mt-20">Loading product...</p>;

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
        <img
          src={product.thumbnail || fallbackImage}
          onError={(e) => (e.target.src = fallbackImage)}
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
              toast.success("Added to cart!");
            }}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            Add to Cart
          </button>

          {!aiRecommendations.length && (
            <button
              onClick={fetchAIRecommendations}
              className="ml-4 mt-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
              disabled={aiLoading}
            >
              {aiLoading ? "Loading AI Suggestions..." : "Get AI Suggestions"}
            </button>
          )}
        </div>
      </div>

      {recommended.length > 0 && (
        <section className="max-w-5xl mx-auto mt-10">
          <h3 className="text-2xl font-semibold mb-4">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {recommended.map((rec) => (
              <div
                key={rec.id}
                className="border rounded p-4 hover:shadow-lg transition duration-300"
              >
                <img
                  src={rec.thumbnail || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                  alt={rec.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h4 className="text-lg font-medium">{rec.title}</h4>
                <p className="text-indigo-600 font-semibold">
                  {formatPrice(rec.price)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {aiRecommendations.length > 0 && (
        <section className="max-w-5xl mx-auto mt-12">
          <h3 className="text-2xl font-semibold mb-4 text-emerald-600">
            AI-Powered Suggestions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {aiRecommendations.map((item, index) => (
              <div
                key={index}
                className="border border-emerald-300 rounded p-4 hover:shadow-lg transition duration-300 bg-white dark:bg-zinc-900"
              >
                <img
                  src={item.thumbnail || fallbackImage}
                  onError={(e) => (e.target.src = fallbackImage)}
                  alt={item.title}
                  className="h-40 w-full object-cover rounded mb-2"
                />
                <h4 className="text-lg font-medium">{item.title}</h4>
                <p className="text-emerald-600 font-semibold">
                  {formatPrice(item.price || 0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <Recommendations currentProduct={product} />
    </PageWrapper>
  );
};

export default ProductDetail;
