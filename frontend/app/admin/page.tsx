"use client";

import {
  Newspaper,
  UserCheck,
  GraduationCap,
  Trophy,
  BookOpen,
  ArrowRight
} from "lucide-react";
import Link from 'next/link';
import { useGuru } from '@/hook/useGuru';
import { useNews } from "@/hook/useNews";
import { useEskul } from "@/hook/useEskul";
import { useAlumni } from "@/hook/useAlumni";

export default function AdminPage() {
  const {guru} = useGuru();
  const {news} = useNews();
  const {eskul} = useEskul();
  const {alumni} = useAlumni();

  const stats = [
    { name: "Total Berita", value: news.length, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", href: "/admin/news" },
    { name: "Kepala Sekolah", value: "1", icon: UserCheck, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", href: "/admin/kepala-sekolah" },
    { name: "Total Guru & Staf", value: guru.length, icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", href: "/admin/guru-staf" },
    { name: "Total Ekskul", value: eskul.length, icon: Trophy, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100", href: "/admin/ekskul" },
    { name: "Total Alumni", value: alumni.length, icon: BookOpen, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100", href: "/admin/alumni" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Ringkasan Dashboard</h1>
        <p className="text-slate-500 mt-1">Selamat datang kembali, Admin SMAN 1 Bangunrejo.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.name} 
            href={stat.href}
            className={`group p-6 rounded-[32px] border ${stat.border} ${stat.bg} hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300 relative overflow-hidden`}
          >
            {/* Background Decoration */}
            <div className={`absolute -right-4 -bottom-4 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12`}>
              <stat.icon size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl ${stat.bg} border ${stat.border} shadow-sm`}>
                  <stat.icon size={24} className={stat.color} />
                </div>
                <div className={`text-3xl font-extrabold ${stat.color} tracking-tight`}>
                  {stat.value}
                </div>
              </div>
              
              <div>
                <div className="text-slate-600 font-bold tracking-wide uppercase text-xs mb-1">{stat.name}</div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  Kelola Data <ArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-brand-primary rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl -ml-20 -mb-20" />
        
        <div className="relative z-10 max-w-2xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
            Sistem Informasi Manajemen SMAN 1 Bangunrejo
          </h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Gunakan panel admin ini untuk mengelola seluruh konten website sekolah dengan mudah, cepat, dan terstruktur. Semua perubahan yang Anda lakukan akan langsung tersinkronisasi ke halaman publik.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/admin/news/add" 
              className="bg-white text-brand-primary font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              Buat Berita Baru
            </Link>
            <Link 
              href="/" 
              target="_blank"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-6 py-3 rounded-2xl hover:bg-white/20 transition-colors"
            >
              Lihat Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
