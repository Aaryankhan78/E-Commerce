import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRecommendationStore = create(
  persist(
    (set) => ({
      recentlyViewed: [],
      addViewedProduct: (product) =>
        set((state) => {
          const exists = state.recentlyViewed.find((p) => p.id === product.id);
          if (exists) return state;
          const updated = [product, ...state.recentlyViewed].slice(0, 5);
          return { recentlyViewed: updated };
        }),
    }),
    { name: 'recommendation-storage' }
  )
);
