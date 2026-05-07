"use client";

import RevealOnScroll from "@/components/animations/RevealOnScroll";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGuru } from "@/hook/useGuru";

export default function TeachersSection() {
  const { guru, loading, error } = useGuru();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <section className="py-24 bg-brand-surface-alt">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-slate-900">
              Guru & Tenaga{" "}
              <span className="text-brand-primary">Kependidikan</span>
            </h2>
            <p className="text-slate-600 text-lg">
              SMA Negeri 1 Bangunrejo didukung oleh {guru.length} tenaga pendidik
              profesional dan berpengalaman di bidangnya masing-masing.
            </p>
          </div>
          <Link
            href="/main/guru-staf"
            className="group inline-flex items-center gap-2 text-brand-primary font-bold hover:text-brand-primary-dark transition-colors"
          >
            Lihat Semua Guru dan Staff{" "}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {guru.slice(0, 4).map((teacher, index)  => (
            <RevealOnScroll
              key={index}
              direction="up"
              delayClassName={`delay-${index * 100}`}
              className="group"
            >
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                {/* Photo container with zoom effect */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={teacher.foto}
                    alt={teacher.nama}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="font-heading font-bold text-slate-900 group-hover:text-brand-primary transition-colors duration-300">
                    {teacher.nama}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    {teacher.jabatan}
                  </p>
                </div>

                {/* Decorative bottom bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-brand-primary w-0 group-hover:w-full transition-all duration-500" />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
