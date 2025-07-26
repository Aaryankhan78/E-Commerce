import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash';
// use this with `v1` endpoint

// Check if API key is set
export const isGeminiEnabled = !!GEMINI_API_KEY;

/**
 * Calls Gemini API with a given prompt and returns parsed JSON.
 * @param {string} prompt - The user prompt to send to Gemini.
 * @returns {Array} - Recommended product array
 */
export const callGeminiAPI = async (prompt) => {
  if (!isGeminiEnabled) {
    throw new Error('Gemini API key not set. AI features are disabled.');
  }

const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const rawText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Clean and extract valid JSON
    const cleaned = rawText.replace(/```json/, '').replace(/```/, '').trim();
    const jsonMatch = cleaned.match(/\[\s*{[\s\S]*?}\s*\]/);
    const jsonString = jsonMatch ? jsonMatch[0] : '[]';

    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) throw new Error("AI did not return a valid array");

    return parsed;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI recommendations');
  }
};
