"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import NavItem from "./NavItem";
import { menuData } from "@/lib/data";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileItem(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;
      const isMobileViewport = window.innerWidth < 900;

      setIsScrolled(currentScrollY > 50);

      if (isMobileViewport && Math.abs(scrollDelta) > 4) {
        if (scrollDelta > 0 && currentScrollY > 100) {
          setIsVisible(false);
          setIsMobileMenuOpen(false);
          setOpenMobileItem(null);
        } else {
          setIsVisible(true);
        }
      } else if (!isMobileViewport) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 font-poppins transition-all duration-500 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          } ${isScrolled
            ? "bg-white/80 min-[900px]:backdrop-blur-sm py-3 shadow-sm"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-1 min-w-0 pr-2">
              <div className="relative w-10 h-10 sm:w-10 sm:h-10 min-[900px]:w-12 min-[900px]:h-12 transition-transform duration-300 group-hover:scale-110 shrink-0">
                <Image
                  src="/img/Smansa.ico"
                  alt="Logo SMAN 1 Bangunrejo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <span className={`font-heading font-bold text-[13px] sm:text-base min-[900px]:text-lg leading-tight tracking-tight truncate transition-colors duration-300 ${isScrolled ? "text-brand-primary" : "text-white"}`}>
                  SMA Negeri 1 Bangunrejo
                </span>
                <span className={`font-poppins font-medium text-[8px] sm:text-[10px] min-[900px]:text-[14px] leading-[1.2] sm:leading-none tracking-wide transition-colors duration-300 line-clamp-2 sm:line-clamp-1 ${isScrolled ? "text-brand-primary-dark/90" : "text-white/90"}`}>
                  B-STAR (Bertaqwa&apos; Santun, Terampil&apos; Adaptif, dan Responsip)
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden min-[900px]:flex items-center gap-2">
              <div className="flex items-center gap-1">
                {menuData.map((item, i) => (
                  <div key={i} className={`font-medium text-[13px] transition-colors duration-300 ${isScrolled ? "text-slate-700" : "text-white/90"}`}>
                    <NavItem menu={item} isScrolled={isScrolled} />
                  </div>
                ))}
              </div>

              {/* Login Button Desktop */}
              <Link
                href="/main/auth/login"
                className={`ml-4 px-5 py-2 rounded-full text-[13px] font-poppins font-bold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 ${isScrolled
                    ? "bg-brand-primary text-white hover:bg-brand-primary-dark"
                    : "bg-white text-brand-primary hover:bg-brand-surface-alt"
                  }`}
              >
                Login
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`min-[900px]:hidden p-2 rounded-lg transition-colors shrink-0 ${isScrolled ? "text-brand-primary hover:bg-slate-100" : "text-white hover:bg-white/10"
                }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved outside transformed nav */}
      <div
        className={`min-[900px]:hidden fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Sidebar - Moved outside transformed nav */}
      <div
        className={`min-[900px]:hidden fixed top-0 right-0 z-[70] h-full w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <span className="font-heading font-bold text-brand-primary text-xl">Menu</span>
            <button
              onClick={closeMenu}
              aria-label="Tutup menu"
              className="p-2 text-slate-400 hover:text-brand-primary"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            {menuData.map((item, i) => (
              <div key={i} className="px-4">
                {item.subItems ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-slate-700 font-semibold hover:bg-brand-surface-alt rounded-lg transition-colors"
                      onClick={() => setOpenMobileItem(openMobileItem === i ? null : i)}
                      aria-label="Toggle submenu"
                    >
                      <span>{item.title}</span>
                      <span className={`transition-transform duration-300 ${openMobileItem === i ? "rotate-180" : ""}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openMobileItem === i ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0"}`}>
                      <div className="ml-4 pl-4 border-l-2 border-slate-100 mt-1 space-y-1">
                        {item.subItems.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            className="block px-4 py-2 text-sm text-slate-500 hover:text-brand-primary hover:bg-brand-surface-alt rounded-md transition-colors"
                            onClick={closeMenu}
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-slate-700 font-semibold hover:bg-brand-surface-alt rounded-lg transition-colors"
                    onClick={closeMenu}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <Link
              href="/main/auth/login"
              className="block w-full text-center py-3 rounded-xl font-bold text-white bg-brand-primary shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-dark transition-all active:scale-95"
              onClick={closeMenu}
            >
              Login Admin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
