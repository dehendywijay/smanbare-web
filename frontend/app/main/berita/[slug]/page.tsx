"use client";

import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import ReadingProgressBar from "@/components/shared/ReadingProgressBar";
import { api_images } from "@/constants/strings";
import { useNewsDetail } from "@/hook/useNewsDetail";
import Image from "next/image";
import React from "react";
import { Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon } from "lucide-react";

export default function Home({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const { news, loading, error } = useNewsDetail(slug);

  return (
    <main className="bg-white min-h-screen">
      <ReadingProgressBar />
      
      <PageHero
        title={news?.title || "Detail Berita"}
        imageUrl={news?.thumbnail?.startsWith('http') ? news.thumbnail : `${api_images}/${news?.thumbnail}`}
        alt={news?.title || "Hero Background"}
        breadcrumbs={[
          { label: "Berita", href: "/main/berita" },
          { label: news?.title ? (news.title.length > 20 ? `${news.title.substring(0, 20)}...` : news.title) : "Loading..." }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Article Content */}
          <article className="lg:col-span-3 space-y-12">
            {loading ? (
              <div className="animate-pulse space-y-8">
                <div className="h-10 bg-slate-100 rounded w-3/4" />
                <div className="flex gap-4">
                  <div className="h-4 bg-slate-100 rounded w-24" />
                  <div className="h-4 bg-slate-100 rounded w-24" />
                </div>
                <div className="h-[400px] bg-slate-100 rounded-3xl w-full" />
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
                <p className="text-red-600 font-bold">{error}</p>
              </div>
            ) : (
              <>
                <RevealOnScroll direction="up" className="space-y-8">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                        <User size={14} />
                      </div>
                      <span>Admin SMANSA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-brand-primary" />
                      <span>{news?.CreatedAt ? new Date(news.CreatedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}</span>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-brand-surface-alt border border-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                      {news?.kategori || "Berita"}
                    </div>
                  </div>

                  {/* Feature Image */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={news?.thumbnail?.startsWith('http') ? news.thumbnail : `${api_images}/${news?.thumbnail}`}
                      alt={news?.title || ""}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Article Body */}
                  <div 
                    className="prose prose-lg prose-slate max-w-none 
                    prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-img:rounded-3xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: news?.content || "" }}
                  />

                  {/* Share Bar */}
                  <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3 text-slate-900 font-bold">
                      <Share2 size={20} className="text-brand-primary" />
                      Bagikan Artikel
                    </div>
                    <div className="flex items-center gap-3">
                      {[
                        { icon: Facebook, color: "bg-[#1877F2]" },
                        { icon: Twitter, color: "bg-[#1DA1F2]" },
                        { icon: LinkIcon, color: "bg-slate-800" },
                      ].map((item, i) => (
                        <button key={i} className={`w-10 h-10 rounded-full ${item.color} text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg`}>
                          <item.icon size={18} />
                        </button>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              </>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <RevealOnScroll direction="left" delayClassName="delay-300">
              <Sidebar />
            </RevealOnScroll>
          </aside>
        </div>
      </div>
    </main>
  );
}
