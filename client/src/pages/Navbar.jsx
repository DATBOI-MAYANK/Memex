import { Link, NavLink } from "react-router-dom";
import {
  Archive,
  BrainCircuit,
  HomeIcon,
  LucideFolderClosed,
  Search,
  Settings,
  X,
} from "lucide-react";
import { motion } from "motion/react";

function Navbar() {
  return (
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
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl font-semibold hover:bg-[#1a1919] duration-200 scale-100 active:scale-95 transition-all ${
              isActive ? "text-[#ADABAA]" : "text-white"
            }`
          }
        >
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined  text-[#bd9dff]">
              <HomeIcon />
            </span>
            <span className="font-headline tracking-wide text-sm">Home</span>
          </motion.div>
        </NavLink>
        {/* - Collections -*/}
        <NavLink
          to="/collections"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl font-semibold hover:bg-[#1a1919] duration-200 scale-100 active:scale-95 transition-all ${
              isActive ? "text-[#ADABAA]" : "text-white"
            }`
          }
        >
          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="material-symbols-outlined">
              <LucideFolderClosed />
            </span>
            <span className="font-headline tracking-wide text-sm">
              Collections
            </span>
          </motion.div>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Navbar;
