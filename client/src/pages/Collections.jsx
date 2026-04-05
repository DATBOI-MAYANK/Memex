import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import { Copy } from "lucide-react";
import { motion } from "motion/react";
import API_URL from "../config";
function Collection() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`${API_URL}/api/items`);

      const data = await res.json();
      setItems(data.data.slice(0, 3));
    };
    fetchItems();
  }, []);

  return (
    <div className="flex h-full w-full">
      <Navbar />

      <div className="flex-1 overflow-y-auto no-scrollbar ml-64 pt-6 pb-20 px-8">
        <div>
          <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-white mb-5">
            List Of Collections
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => {
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
    </div>
  );
}

export default Collection;
