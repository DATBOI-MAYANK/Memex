import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

async function generateTags(title, content) {
  const prompt = `Read this content and return ONLY a JSON array of 5 tags.
  No explanation, no extra text. Just the array.
  Example output: ["react","tutorial","frontend","javascript","web"]

  Title:${title},
  Content:${content}
  `;
  const result = await chatModel.generateContent(prompt);
  const text = result.response.text().trim();
  const tags = JSON.parse(text);

  return tags;
}

async function generateEmbedding(text) {
  const result = await embedModel.embedContent({
    content: { parts: [{ text }], role: "user" },
    outputDimensionality: 768,
  });
  const embedding = result.embedding.values;
  return embedding;
}

export { generateTags, generateEmbedding };
