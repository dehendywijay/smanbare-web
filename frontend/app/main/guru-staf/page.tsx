"use client";

import { useState } from "react";
import Sidebar from "@/components/news/SideNews";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import PageHero from "@/components/shared/PageHero";
import Image from "next/image";
import { Search, UserX } from "lucide-react";
import { useGuru } from "@/hook/useGuru";

export default function GuruStafPage() {
  const { guru, loading, error } = useGuru();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = guru.filter((staff) =>
    staff.nama.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="bg-white min-h-screen">
      <PageHero
        title="Guru & Tenaga Kependidikan"
        imageUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop"
        alt="Guru & Staf"
        breadcrumbs={[{ label: "Guru & Staf" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Main Content */}
          <section className="lg:col-span-3 space-y-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900">
                  Keluarga Besar{" "}
                  <span className="text-brand-primary">SMAN 1 Bangunrejo</span>
                </h2>
                <p className="text-slate-600 text-lg max-w-3xl">
                  Kami bangga memiliki jajaran tenaga pendidik yang berdedikasi
                  tinggi, kompeten, dan memiliki semangat untuk mencerdaskan
                  kehidupan bangsa melalui pendidikan yang berkualitas.
                </p>
              </div>

              {/* Search Bar */}
              <RevealOnScroll direction="up" delayClassName="delay-100">
                <div className="relative max-w-md group">
                  <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Cari nama guru atau staf..."
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300 text-slate-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </RevealOnScroll>
            </div>

            {filteredStaff.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredStaff.map((staff, index) => (
                  <RevealOnScroll
                    key={index}
                    direction="up"
                    delayClassName={`delay-${(index % 3) * 100}`}
                    className="group"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                      {/* Photo container with zoom effect */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={staff.foto}
                          alt={staff.nama}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-6 text-center">
                        <h3 className="font-heading font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-300">
                          {staff.nama}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">
                          {staff.jabatan}
                        </p>
                      </div>

                      {/* Decorative bottom bar */}
                      <div className="absolute bottom-0 left-0 h-1 bg-brand-primary w-0 group-hover:w-full transition-all duration-500" />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            ) : (
              <RevealOnScroll
                direction="up"
                className="py-20 text-center space-y-4 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto text-slate-300">
                  <UserX size={32} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-heading font-bold text-slate-900">
                    Guru tidak ditemukan
                  </h3>
                  <p className="text-slate-500">
                    Maaf, kami tidak menemukan nama guru yang Anda cari.
                  </p>
                </div>
              </RevealOnScroll>
            )}

            {/* Quote or Call to Action */}
            <RevealOnScroll
              direction="up"
              className="bg-brand-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden"
            >
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl md:text-3xl font-heading font-bold italic">
                  &quot;Pendidikan adalah senjata paling mematikan di dunia, karena
                  dengan pendidikan, Anda dapat mengubah dunia.&quot;
                </h3>
                <p className="text-blue-100 font-medium">— Nelson Mandela</p>
              </div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-secondary/20 rounded-full blur-3xl" />
            </RevealOnScroll>
          </section>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32">
              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
