import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';

const AIRecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const promptData = {
    title: 'Popular Product',
    category: 'all',
    description: 'General popular products',
  };

  useEffect(() => {
    const fetchAIRecommendations = async () => {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        toast.error('Server URL not configured');
        return;
      }

      setLoading(true);
      try {
        const response = await axios.post(`${backendUrl}/api/ai/recommend`, promptData);
        const data = response.data.recommendations;

        if (Array.isArray(data)) {
          // Normalize AI response
          const cleaned = data.map((item, idx) => {
            let price = 0;
            if (typeof item.price === 'number') {
              price = item.price;
            } else if (typeof item.price === 'string') {
              const parsed = parseFloat(item.price.replace(/[^0-9.]/g, ''));
              price = isNaN(parsed) ? 0 : parsed;
            }

            return {
              id: item.id || item._id || idx,
              title: item.title || 'Untitled Product',
              price,
              thumbnail:
                item.thumbnail ||
                item.image ||
                item.imageUrl ||
                '/fallback.jpg', // Default fallback image
            };
          });

          setRecommendations(cleaned);
        } else {
          toast.error('No AI recommendations returned.');
        }
      } catch (error) {
        console.error('AI Recommendation failed', error);
        toast.error('AI suggestions unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchAIRecommendations();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">AI-Powered Product Suggestions</h2>

      {loading ? (
        <p className="text-center mt-20">Loading AI Recommendations...</p>
      ) : recommendations.length === 0 ? (
        <p className="text-center mt-10">No recommendations available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendationsPage;
