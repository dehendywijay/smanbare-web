"use client";

import { useState } from "react";
import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import Image from "next/image";
import {
  Handshake,
  School,
  Search,
  UserX
} from "lucide-react";
import { useAlumni } from "@/hook/useAlumni";

export default function AlumniPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const {alumni} = useAlumni();

  const filteredAlumni = alumni.filter((alumni) =>
    alumni.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alumni.universitas.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <main className="bg-white min-h-screen">
      <PageHero
        title="Alumni"
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop"
        alt="Alumni"
        breadcrumbs={[{ label: "Alumni" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-16">
            <RevealOnScroll direction="up" className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
                <Handshake size={16} className="text-brand-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">Jejaring Alumni</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
                Membangun Sinergi <br />
                <span className="text-brand-primary">Lintas Generasi</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Halaman alumni menjadi ruang untuk mempererat jejaring lintas angkatan, berbagi pengalaman, serta membuka peluang kolaborasi bagi siswa aktif dan lulusan. Kami percaya bahwa kesuksesan alumni adalah cermin keberhasilan pendidikan di SMAN 1 Bangunrejo.
                </p>
                <p>
                  Kami mendorong alumni untuk berkontribusi melalui program mentoring, seminar karier, beasiswa, dan dukungan pengembangan sekolah. Mari kita bersinergi demi masa depan generasi bangsa yang unggul.
                </p>
              </div>
            </RevealOnScroll>

            {/* Alumni Cards Section */}
            <div className="space-y-12 pt-8 border-t border-slate-100">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
                    Profil <span className="text-brand-primary">Alumni SMANSA</span>
                  </h2>
                  <p className="text-slate-600 text-lg max-w-3xl">
                    Mengenal lebih dekat para alumni yang telah melanjutkan pendidikan ke perguruan tinggi.
                  </p>
                </div>

                {/* Search Bar */}
                <RevealOnScroll direction="up" delayClassName="delay-100">
                  <div className="relative max-w-md group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
                    <input
                      type="text"
                      placeholder="Cari nama alumni atau universitas..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300 text-slate-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </RevealOnScroll>
              </div>

              {filteredAlumni.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredAlumni.map((alumni, index) => (
                    <RevealOnScroll
                      key={alumni.ID}
                      direction="up"
                      delayClassName={`delay-${(index % 3) * 100}`}
                      className="group"
                    >
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                        {/* Photo container */}
                        <div className="relative aspect-[4/5] overflow-hidden">
                          <Image
                            src={alumni.foto}
                            alt={alumni.nama}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                           Angkatan {parseInt(alumni.tahun) - 2005 } 
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-6 text-center">
                          <h3 className="font-heading font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-300">
                            {alumni.nama} <br />
                          </h3>
                          
                          <div className="flex items-center justify-center gap-1.5 mt-2 text-slate-600">
                            <School size={16} className="text-brand-primary/80" />
                            <p className="text-sm font-medium italic">
                              {alumni.universitas}
                            </p>
                          </div>
                        </div>

                        {/* Decorative bottom bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-brand-primary w-0 group-hover:w-full transition-all duration-500" />
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              ) : (
                <RevealOnScroll direction="up" className="py-20 text-center space-y-4 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-slate-300">
                    <UserX size={32} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-heading font-bold text-slate-900">Alumni tidak ditemukan</h3>
                    <p className="text-slate-500">Maaf, kami tidak menemukan alumni dengan kriteria tersebut.</p>
                  </div>
                </RevealOnScroll>
              )}
            </div>
          </section>

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

