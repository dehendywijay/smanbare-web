"use client";

import { Bell, User, Menu, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/main/auth/authcontext";

const navItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "News", href: "/admin/news" },
  { name: "Kepala Sekolah", href: "/admin/kepala-sekolah" },
  { name: "Guru & Staf", href: "/admin/guru-staf" },
  { name: "Ekskul", href: "/admin/ekskul" },
  { name: "Alumni", href: "/admin/alumni" },
];

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  // Find current page name from navItems
  const currentPage = navItems.find((item) => item.href === pathname)?.name || "Dashboard";

  const [adminName, setAdminName] = useState("Admin SMANSA");

  useEffect(() => {
    const name = localStorage.getItem("admin_name");
    if (name) {
      //eslint-disable-next-line react-hooks/set-state-in-effect
      setAdminName(name);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("admin_name");
    await logout();
    router.push("/main/auth/login");
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Menu"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        
        <h2 className="text-lg font-bold text-slate-800">
          {currentPage}
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-100">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-bold text-slate-800">{adminName}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Administrator</div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-brand-surface-alt flex items-center justify-center border border-brand-primary/10 shadow-sm">
            <User className="h-6 w-6 text-brand-primary" />
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
