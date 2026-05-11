"use client";

import { useState } from "react";
import { api_images } from "@/constants/strings";
import { useNews } from "@/hook/useNews";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, ChevronRight, X } from "lucide-react";

export default function Sidebar() {
  const { news, loading, error } = useNews();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = news.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-full space-y-12 sticky top-24">
      {/* Search Widget */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
          <span className="w-1.5 h-6 bg-brand-primary rounded-full" />
          Cari Berita
        </h3>
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ketik kata kunci..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all text-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-primary transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Latest Posts Widget */}
      <div className="space-y-6">
        <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
          <span className="w-1.5 h-6 bg-brand-primary rounded-full" />
          {searchQuery ? "Hasil Pencarian" : "Berita Terbaru"}
        </h3>
        
        <div className="space-y-6">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-20 h-20 bg-slate-100 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-3 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ))
          ) : error ? (
            <p className="text-sm text-red-500">Gagal memuat berita.</p>
          ) : filteredNews.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <p className="text-sm text-slate-500 font-medium">Berita tidak ditemukan.</p>
            </div>
          ) : (
            filteredNews.slice(0, 5).map((post) => (
              <Link 
                key={post.ID} 
                href={`/main/berita/${post.slug}`} 
                className="flex gap-4 group items-start"
              >
                <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                  <Image 
                    src={post.thumbnail?.startsWith('http') ? post.thumbnail : `${api_images}/${post.thumbnail}`} 
                    alt={post.title} 
                    fill 
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="font-heading font-bold text-sm leading-snug text-slate-800 group-hover:text-brand-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                    <Calendar size={12} className="text-brand-primary" />
                    {post.CreatedAt ? new Date(post.CreatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "-"}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {!searchQuery && (
          <Link 
            href="/main/berita" 
            className="inline-flex items-center gap-2 text-brand-primary font-bold text-sm hover:translate-x-1 transition-transform"
          >
            Lihat Semua Berita <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </aside>
  );
}
