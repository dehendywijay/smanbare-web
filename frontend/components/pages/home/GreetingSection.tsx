"use client";

import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/animations/RevealOnScroll";
import { ArrowRight, Quote } from "lucide-react";
import { use } from "react";
import { useKepalaDetail } from "@/hook/useKepala";

export default function GreetingSection() {
  const { kepala, loading, error } = useKepalaDetail(1);

  loading;
  error;

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          {/* Image Side */}
          <RevealOnScroll
            direction="left"
            className="relative w-full max-w-[400px] aspect-[4/5] shrink-0"
          >
            <div className="absolute -inset-4 border-2 border-brand-primary/20 rounded-2xl -z-10 translate-x-4 translate-y-4" />
            <div className="absolute inset-0 bg-brand-primary/10 rounded-2xl -z-10" />

            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={kepala?.foto || "/default-kepala.jpg"}
                alt="Kepala Sekolah"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Name Tag Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-primary to-transparent text-white">
                <p className="font-heading font-bold text-lg">{kepala?.name}</p>
                <p className="text-xs uppercase tracking-widest text-white/80">
                  Kepala Sekolah
                </p>
              </div>
            </div>
          </RevealOnScroll>

          {/* Text Side */}
          <RevealOnScroll direction="right" className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-surface-alt border border-brand-primary/10">
                <span className="w-2 h-2 rounded-full bg-brand-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Sambutan Resmi
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
                Membangun Generasi <br />
                <span className="text-brand-primary italic">
                  Cerdas & Berkarakter
                </span>
              </h2>
            </div>

            <div className="relative pl-8 border-l-4 border-brand-primary/30">
              <Quote className="absolute -left-3 -top-6 text-brand-primary/10 w-16 h-16 -z-10" />
              <div
                className="space-y-4 text-slate-600 leading-relaxed text-lg italic"
                dangerouslySetInnerHTML={{ __html: kepala?.content || "" }}
              />
            </div>

            <p className="text-slate-600 leading-relaxed">
              Website ini hadir sebagai jembatan informasi dan komunikasi antara
              sekolah, siswa, orang tua, serta masyarakat luas. Mari kita
              bersinergi demi masa depan generasi bangsa yang unggul.
            </p>

            <div className="pt-4">
              <Link
                href="/main/sambutan"
                className="group inline-flex items-center gap-3 bg-slate-900 hover:bg-brand-primary text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-xl hover:shadow-brand-primary/20 active:scale-95"
              >
                Baca Sambutan Lengkap
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
