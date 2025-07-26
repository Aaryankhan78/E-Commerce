import { callGeminiAPI } from '../config/gemini.js';

export const recommendProducts = async (req, res) => {
  const { title, category, description } = req.body;

  const prompt = `
You are a product recommendation engine.

Given the following product:
- Title: "${title}"
- Category: "${category}"
- Description: "${description}"

Recommend 4 similar products in this exact JSON format:
[
  {
    "title": "Product A",
    "category": "Category A",
    "description": "Short description here",
    "price": 499.99,
    "thumbnail": "https://example.com/image.jpg"
  },
  ...
]

- Ensure the price is a realistic number (between 100 and 9999).
- Use placeholder thumbnail image URLs if real ones are not available.
- Return ONLY a valid JSON array. Do not add explanation or markdown.
`;

  try {
    const recommendations = await callGeminiAPI(prompt);

    // ✅ No need to JSON.parse here again
    return res.json({ recommendations });
  } catch (error) {
    console.error("❌ AI recommendation failed:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
