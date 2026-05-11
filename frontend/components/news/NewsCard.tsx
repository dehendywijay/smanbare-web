"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { News } from "@/types/type";
import { api_images } from "@/constants/strings";

type NewsCardProps = {
  news: News;
};

export default function NewsCard({ news }: NewsCardProps) {
  if (!news) return null;
  
  // Handle both external and internal images
  const imageUrl = news.thumbnail?.startsWith('http') 
    ? news.thumbnail 
    : `${api_images}/${news.thumbnail}`;

  const formattedDate = news.CreatedAt 
    ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(news.CreatedAt))
    : "Tanggal tidak tersedia";

  return (
    <Link 
      href={`/main/berita/${news.slug}`}
      className="group relative block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
          {news.kategori}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl}
          alt={news.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Calendar size={14} className="text-brand-primary" />
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
          {news.title}
        </h3>
        
        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
          {news.content?.replace(/<[^>]*>/g, '') || ""}
        </p>

        <div className="pt-2 flex items-center gap-2 text-brand-primary font-bold text-sm">
          Baca Selengkapnya
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>

      {/* Decorative Border */}
      <div className="absolute top-0 left-0 w-1 h-0 bg-brand-primary group-hover:h-full transition-all duration-500" />
    </Link>
  );
}
