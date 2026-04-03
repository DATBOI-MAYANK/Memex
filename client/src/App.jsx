import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import {
  Archive,
  BrainCircuit,
  Home,
  LucideFolderClosed,
  Search,
  Settings,
} from "lucide-react";
import "./App.css";

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
      console.log("Data in effect:", data.data);
      setItems(data.data);
      console.log(items);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    console.log("Items", items);
  }, [items]);

  const searchItem = async () => {
    const res = await fetch(`http://localhost:3001/api/search?q=${query}`);

    const data = await res.json();
    console.log(data.data);
    console.log(data);
    setQueryItems(data.data);
    setQuery("");
  };

  return (
    <div className="flex h-full w-full">
      <aside className="h-full w-64 border-r-0 bg-[#131313] dark:bg-[#131313] fixed z-10 flex flex-col h-full py-6 px-4">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 primary-gradient rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-fixed text-sm">
                <Archive />
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight font-headline">
                Memex
              </h1>
              <p className="text-[10px] text-[#ADABAA] uppercase tracking-[0.2em] text-on-surface-variant font-label">
                Personal Archive
              </p>
            </div>
          </div>
        </div>
        <nav className="  flex gap-1 flex-col h-full">
          {/* - Home (Active) -*/}
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-white font-semibold hover:bg-[#1a1919] transition-colors duration-200 scale-100 active:scale-95 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined text-[#bd9dff]">
              <Home />
            </span>
            <span className="font-headline tracking-wide text-sm">Home</span>
          </a>
          {/* - Collections -*/}
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#ADABAA] hover:bg-[#1a1919] transition-colors duration-200 scale-100 active:scale-95 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">
              {" "}
              <LucideFolderClosed />
            </span>
            <span className="font-headline tracking-wide text-sm">
              Collections
            </span>
          </a>
          {/* - Graph -*/}
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#adaaaa] hover:bg-[#1a1919] transition-colors duration-200 scale-100 active:scale-95 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">
              <BrainCircuit />
            </span>
            <span className="font-headline tracking-wide text-sm">Graph</span>
          </a>
          {/* - Settings --*/}
          <a
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-[#adaaaa] hover:bg-[#1a1919] transition-colors duration-200 scale-100 active:scale-95 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">
              <Settings />
            </span>
            <span className="font-headline tracking-wide text-sm">
              Settings
            </span>
          </a>
        </nav>
        <div className="mt-auto px-2">
          <button className="w-full primary-gradient text-on-primary-fixed font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-sm">add</span>
            <span className="font-headline text-sm">New Entry</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden bg-surface">
        <header className="fixed top-0 left-64 w-[calc(100%-16rem)] z-40 bg-[#0e0e0e]/60 backdrop-blur-xl flex items-center justify-between px-8 py-4 w-full">
          <div className="flex-1 max-w-2xl">
            <div className="relative group text-[#F3F0EF]">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                <Search />
              </span>
              <input
                className="w-full  bg-[#000000] py-3 pl-12 pr-4 rounded-full ghost-border focus:ring-0 focus:outline-none focus:border-primary transition-all text-sm placeholder:text-on-surface-variant"
                placeholder="Search your knowledge..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar ml-64 pt-28 pb-20 px-8">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-white mb-2">
              Recent Thinking
            </h2>
            <p className="text-on-surface-variant font-body">
              Refining your archive from the last 7 days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {items.map((item) => {
              return (
                <div className="group bg-[#1a1919] rounded-xl p-6 ghost-border hover:bg-surface-container-high transition-all duration-300 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag) => (
                      <span className="px-2 py-1 bg-surface-variant text-[10px] text-on-surface-variant rounded-md font-label uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full primary-gradient flex items-center justify-center text-on-primary-fixed shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all z-50">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </main>
    </div>
  );
}

export default App;
