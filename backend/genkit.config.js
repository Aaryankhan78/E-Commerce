// genkit.config.js
import { defineConfig } from '@genkit-ai/core';
import { googleGenerativeAI } from '@genkit-ai/google-genai';

export default defineConfig({
  plugins: [googleGenerativeAI()],
  generativeModels: {
    geminiPro: {
      provider: 'google-genai',
      model: 'gemini-pro',
    },
  },
});
