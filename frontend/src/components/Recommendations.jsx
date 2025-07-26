import React from 'react';
import { useRecommendationStore } from '../store/recommendationStore';
import ProductCard from './ProductCard';

const Recommendations = ({ currentProduct }) => {
  const { recentlyViewed } = useRecommendationStore();
  const recommendations = recentlyViewed.filter(
    (p) => p.id !== currentProduct.id && p.category === currentProduct.category
  );

  if (!recommendations.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">You may also like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
