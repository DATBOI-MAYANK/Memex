import { useEffect, useState } from "react";
import { Copy, Search } from "lucide-react";
import "../App.css";
import Navbar from "./Navbar";
import { motion } from "motion/react";
import API_URL from "../config";
function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [queryItems, setQueryItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const displayItems = isSearching ? queryItems : items;

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`${API_URL}/api/items`);

      const data = await res.json();
      setItems(data.data.slice(0, 3));
    };
    fetchItems();
  }, []);

  const searchItem = async () => {
    const res = await fetch(`${API_URL}/api/search?q=${query}`);

    const data = await res.json();
    setQueryItems(data.data);
    setIsSearching(true);
    setQuery("");
  };

  return (
    <div className="flex h-full w-full">
      <Navbar />

      <main className="flex-1 flex flex-col relative overflow-hidden bg-surface">
        <header className="fixed top-0 left-64 w-[calc(100%-16rem)] z-40 bg-[#0e0e0e]/60 backdrop-blur-xl flex items-center justify-between px-8 py-4 w-full">
          <div className="flex-1 max-w-2xl">
            <div className="relative flex group text-[#F3F0EF]">
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
              <motion.button
                className="hover:cursor-pointer ml-5 p-2 px-5 rounded-3xl bg-[#000000]"
                onClick={searchItem}
                whileTap={{ scale: 0.5 }}
              >
                <span className="font-bold text-lg">Search</span>
              </motion.button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto no-scrollbar ml-64 pt-28 pb-20 px-8">
          <div className="mb-12">
            <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-white mb-2">
              Recent Thinking
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {displayItems.map((item) => {
              return (
                <div className="group bg-[#1a1919] rounded-xl p-6 ghost-border hover:bg-surface-container-high transition-all duration-300 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-white font-headline leading-tight mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <motion.button
                      onClick={() => navigator.clipboard.writeText(item.url)}
                      className="hover:cursor-pointer p-2 rounded-lg hover:bg-[#2a2a2a] transition-all"
                      whileTap={{ scale: 0.5 }}
                    >
                      <Copy />
                    </motion.button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map((tag) => (
                      <span className="px-2 py-1 bg-surface-variant text-[10px] text-on-surface-variant rounded-md font-label uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div>
                    {new Date(item.created_at).toLocaleDateString("en-UK")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
