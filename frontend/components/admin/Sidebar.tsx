"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Tags,
  Users,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  GraduationCap,
  Trophy,
  BookOpen,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Kepala Sekolah", href: "/admin/kepala-sekolah", icon: UserCheck },
  { name: "Guru & Staf", href: "/admin/guru-staf", icon: GraduationCap },
  { name: "Ekskul", href: "/admin/ekskul", icon: Trophy },
  { name: "Alumni", href: "/admin/alumni", icon: BookOpen },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    onClose();
  }, [pathname]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-slate-900 text-white transition-all duration-300 ease-in-out md:relative md:translate-x-0",
        isCollapsed ? "md:w-20" : "md:w-64",
        isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-slate-800">
          {!isCollapsed && (
            <h1 className="text-xl font-bold truncate">
              <Link href="/admin">Admin Panel</Link>
            </h1>
          )}
          
          {/* Toggle buttons */}
          <button onClick={toggleSidebar} className="hidden md:flex p-2 rounded-md hover:bg-slate-800 transition-colors">
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
          
          <button onClick={onClose} className="md:hidden p-2 rounded-md hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-xl transition-all duration-200 group",
                pathname === item.href 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white",
                isCollapsed && !isOpen ? "justify-center" : "",
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-white"
              )} />
              {(!isCollapsed || isOpen) && (
                <span className="ml-4 font-medium truncate">{item.name}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer info (optional) */}
        <div className="p-4 border-t border-slate-800">
          {(!isCollapsed || isOpen) && (
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
              Smansa Admin v1.0
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
