import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("");
  const [query, setQuery] = useState("");
  const [queryItems, setQueryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    const { data, error } = await supabase.from("items").select("*");
    if (error) return setStatus("Error: " + error.message);
    setItems(data);
    setStatus("Connected! Items: " + data.length);
  };

  const saveItem = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Node JS Tutorial",
          type: "video",
        }),
      });
      const data = await res.json();
      console.log("Data in save:", data);
      setItems(data.item);
      console.log("Data in items:", items);
      setStatus(data.success ? "Saved!" : "Error: " + data.error);
    } catch (err) {
      setStatus("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("http://localhost:3001/api/items");

      const data = await res.json();
      console.log("Data in effect:", data.item);
      console.log("Data in effect:", data);
      setItems(data.data);
    };
    fetchItems();
  }, []);

  const searchItem = async () => {
    const res = await fetch(`http://localhost:3001/api/search?q=${query}`);

    const data = await res.json();
    console.log(data.data);
    console.log(data);
    setQueryItems(data.data);
    setQuery("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Memex</h1>
      <button onClick={testConnection}>Test Supabase</button>
      <button
        onClick={saveItem}
        disabled={loading}
        style={{ marginLeft: "1rem" }}
      >
        {loading ? "Saving..." : "Save"}
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchItem} style={{ marginLeft: "1rem" }}>
        Search
      </button>
      <h2>Query Items</h2>
      <ul>
        {queryItems.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.tags?.join(", ")}</p>
          </div>
        ))}
      </ul>

      {/* <p>{status}</p>
      <ul>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.tags?.join(", ")}</p>
          </div>
        ))}
      </ul>*/}
    </div>
  );
}

export default App;
