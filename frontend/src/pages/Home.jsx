import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import PageWrapper from '../components/PageWrapper';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const res = await fetch('https://dummyjson.com/products?limit=6');
      const data = await res.json();
      setFeatured(data.products);
    };
    fetchFeatured();
  }, []);

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Home;
