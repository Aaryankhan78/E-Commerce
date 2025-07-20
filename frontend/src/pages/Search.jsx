import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Search = () => {
  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("default");

  const query = params.get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      let sorted = data.products;

      if (sort === "low") {
        sorted = [...sorted].sort((a, b) => a.price - b.price);
      } else if (sort === "high") {
        sorted = [...sorted].sort((a, b) => b.price - a.price);
      } else if (sort === "popular") {
        sorted = [...sorted].sort((a, b) => b.rating - a.rating);
      }

      setProducts(sorted);
    };

    fetchSearchResults();
  }, [query, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Search Results for: "{query}"</h2>

      <div className="mb-6 flex items-center justify-between">
        <span>{products.length} items found</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="default">Sort by</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} view="grid" />
        ))}
      </div>
    </div>
  );
};

export default Search;
