import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import PageWrapper from "../components/PageWrapper";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
      const data = await res.json();
      setProducts(data.products);
    };

    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border px-4 py-2 rounded w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <button
              onClick={() => setView("grid")}
              className={`mr-2 ${view === "grid" ? "font-bold" : ""}`}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={`${view === "list" ? "font-bold" : ""}`}
            >
              List
            </button>
          </div>
        </div>

        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} view={view} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Products;
