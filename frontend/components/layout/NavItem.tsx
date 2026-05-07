"use client";
import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/types/type";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {
  menu: MenuItem;
  isScrolled?: boolean;
};

export default function NavItem({ menu, isScrolled }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div 
      className="relative group" 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false);
        }
      }}
    >
      <Link 
        href={menu.href} 
        className={`flex items-center gap-1.5 px-4 py-5 rounded-lg transition-all duration-300 ${
          isScrolled 
            ? "hover:text-brand-primary hover:bg-brand-surface-alt" 
            : "hover:text-white hover:bg-white/10"
        }`}
      >
        <span className="font-poppins">{menu.title}</span>
        {menu.subItems && (
          <ChevronDown 
            size={14} 
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        )}
      </Link>

      {/* Dropdown with Framer Motion */}
      <AnimatePresence>
        {menu.subItems && open && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full w-64 z-50 pt-2"
          >
            {/* Arrow pointer */}
            <div className="absolute top-1 left-10 w-3 h-3 bg-white rotate-45 border-l border-t border-slate-100/50 shadow-sm"></div>

            {/* Dropdown menu */}
            <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden relative">
              <div className="py-2">
                {menu.subItems.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="block px-5 py-3 text-sm font-medium text-slate-600 hover:text-brand-primary hover:bg-brand-surface-alt transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
