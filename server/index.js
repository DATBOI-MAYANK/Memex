import "dotenv/config";
import express from "express";
import cors from "cors";
import { supabase } from "./lib/supabase.js";
import { generateTags, generateEmbedding } from "./lib/ai.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" })); // Vite default port
app.use(express.json());

// Test route
app.get("/api/test", async (req, res) => {
  const { data, error } = await supabase.from("items").select("*").limit(5);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Supabase connected!", items: data });
});

// Save route
app.post("/api/save", async (req, res) => {
  const { url, title, content_text, type } = req.body;

  if (!title) return res.status(400).json({ error: "Title required" });

  const [tags, embedding] = await Promise.all([
    generateTags(title, content_text),
    generateEmbedding(title + " " + content_text),
  ]);

  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        user_id: "temp-user-1",
        url,
        title,
        content_text,
        type: type || "article",
        tags,
        embedding,
      },
    ])
    .select();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, item: data[0] });
});

app.get("/api/items", async (req, res) => {
  const { data, error } = await supabase
    .from("items")
    .select("id, title, url, type, tags, content_text, created_at")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
