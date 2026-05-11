"use client";

import PageHero from "@/components/shared/PageHero";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";
import { useEskul } from "@/hook/useEskul";

export default function EkskulPage() {
  const { eskul, loading, error } = useEskul();

  return (
    <main className="bg-white min-h-screen">
      <PageHero
        title="Ekstrakurikuler"
        imageUrl="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop"
        alt="Ekstrakurikuler"
        breadcrumbs={[{ label: "Ekskul" }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <section className="space-y-16">
          {/* Header Section */}
          <RevealOnScroll
            direction="up"
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
              <Compass size={16} className="text-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                Minat & Bakat
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
              Wadah Kreativitas{" "}
              <span className="text-brand-primary">Siswa</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Kami percaya bahwa pendidikan tidak hanya terjadi di dalam kelas.
              SMANSA menyediakan beragam kegiatan untuk membantu siswa
              mengembangkan potensi diri.
            </p>
          </RevealOnScroll>

          {/* Grid Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {eskul.map((ekskul, index) => (
              <RevealOnScroll
                key={ekskul.nama}
                direction="up"
                delayClassName={`delay-${index * 100}`}
                className="group"
              >
                <Link
                  href={`/main/ekskul/${ekskul.slug}`}
                  className="block relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={ekskul.foto}
                      alt={ekskul.nama}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                    {/* Badge */}
                    <div className="absolute bottom-4 left-6">
                      <span className="px-3 py-1 rounded-full bg-brand-secondary text-slate-900 text-[10px] font-bold uppercase tracking-wider">
                        Ekskul Unggulan
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-4">
                    <h3 className="font-heading font-bold text-2xl text-slate-900 group-hover:text-brand-primary transition-colors">
                      {ekskul.nama}
                    </h3>
                    <p
                      className="text-slate-600 text-sm leading-relaxed line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: ekskul.tujuan || "" }}
                    />
                    <div className="pt-2 flex items-center gap-2 text-brand-primary font-bold text-sm">
                      Selengkapnya
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>

                  {/* Top line decoration */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
