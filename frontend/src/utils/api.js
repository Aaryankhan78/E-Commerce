const BASE_URL = "https://dummyjson.com";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?limit=100`);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};
